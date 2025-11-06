"use client";

import React, { useState } from "react";
import { CustomNodeData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Calendar, Info, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface NodeConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeData: CustomNodeData;
  onSave: (config: Record<string, unknown>) => void;
}

export default function NodeConfigModal({
  isOpen,
  onClose,
  nodeData,
  onSave,
}: NodeConfigModalProps) {
  const [config, setConfig] = useState(nodeData.config || {});
  const [scheduleType, setScheduleType] = useState(
    config.scheduleType || "simple"
  );

  // Generate time slots with 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourStr = hour.toString().padStart(2, "0");
        const minuteStr = minute.toString().padStart(2, "0");
        const timeValue = `${hourStr}:${minuteStr}`;
        const displayTime = formatTime12Hour(timeValue);
        slots.push({
          value: timeValue,
          label: displayTime,
        });
      }
    }
    return slots;
  };

  const formatTime12Hour = (time24: string) => {
    const [hour, minute] = time24.split(":");
    const hourNum = parseInt(hour);
    const isPM = hourNum >= 12;
    const hour12 = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
    return `${hour12}:${minute} ${isPM ? "PM" : "AM"}`;
  };

  const timeSlots = generateTimeSlots();

  const handleSave = () => {
    // For schedule nodes, ensure cron expression is generated
    if (nodeData.nodeType === "schedule") {
      const finalConfig = {
        ...config,
        cron: generateCronExpression(),
        scheduleType,
      };

      if (
        !finalConfig.cron ||
        finalConfig.cron === "undefined undefined * * *"
      ) {
        toast.error("Invalid schedule configuration", {
          description: "Please configure a valid schedule timing",
          duration: 4000,
        });
        return;
      }

      onSave(finalConfig);
    } else {
      onSave(config);
    }

    toast.success("Node configuration saved", {
      description: `${nodeData.label} has been configured successfully`,
      duration: 3000,
    });
    onClose();
  };

  const generateCronExpression = () => {
    if (scheduleType === "simple") {
      const frequency = config.frequency as string;
      const time = config.time as string;
      const dayOfWeek = config.dayOfWeek as string;
      const dayOfMonth = config.dayOfMonth as string;

      if (frequency === "daily" && time) {
        const [hour, minute] = time.split(":");
        return `${minute} ${hour} * * *`;
      } else if (frequency === "weekly" && time && dayOfWeek) {
        const [hour, minute] = time.split(":");
        return `${minute} ${hour} * * ${dayOfWeek}`;
      } else if (frequency === "monthly" && time && dayOfMonth) {
        const [hour, minute] = time.split(":");
        return `${minute} ${hour} ${dayOfMonth} * *`;
      } else if (frequency === "hourly") {
        return `0 * * * *`;
      }
    }
    return (config.cron as string) || "0 9 * * *";
  };

  const renderConfigForm = () => {
    switch (nodeData.nodeType) {
      case "webhook":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Webhook URL</Label>
              <Input
                type="url"
                value={(config.url as string) || ""}
                onChange={(e) => setConfig({ ...config, url: e.target.value })}
                placeholder="https://your-webhook-url.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Method</Label>
              <Select
                value={(config.method as string) || "POST"}
                onValueChange={(value) =>
                  setConfig({ ...config, method: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "schedule":
        return (
          <div className="space-y-4">
            <Tabs
              value={scheduleType as string}
              onValueChange={setScheduleType}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="simple" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Simple
                </TabsTrigger>
                <TabsTrigger
                  value="advanced"
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Advanced
                </TabsTrigger>
              </TabsList>

              <TabsContent value="simple" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-sm">
                      Schedule Frequency
                    </CardTitle>
                    <CardDescription>
                      Choose when this workflow should run
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select
                        value={(config.frequency as string) || "daily"}
                        onValueChange={(value) => {
                          const newConfig: Record<string, unknown> = {
                            ...config,
                            frequency: value,
                          };
                          if (value === "hourly") {
                            newConfig.cron = "0 * * * *";
                          }
                          setConfig(newConfig);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Every Hour</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(config.frequency === "daily" ||
                      config.frequency === "weekly" ||
                      config.frequency === "monthly") && (
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <div className="relative">
                          <Select
                            value={(config.time as string) || "09:00"}
                            onValueChange={(value) => {
                              const newConfig = { ...config, time: value };
                              setConfig(newConfig);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <div className="flex items-center justify-between w-full">
                                <span className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  {config.time
                                    ? formatTime12Hour(config.time as string)
                                    : "Select time..."}
                                </span>
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </SelectTrigger>
                            <SelectContent className="max-h-64">
                              <div className="p-2 border-b">
                                <div className="text-xs font-medium text-muted-foreground mb-2">
                                  Quick Select
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  {[
                                    "09:00",
                                    "12:00",
                                    "15:00",
                                    "18:00",
                                    "21:00",
                                  ].map((time) => (
                                    <Button
                                      key={time}
                                      variant="outline"
                                      size="sm"
                                      className="h-7 text-xs"
                                      onClick={() => {
                                        const newConfig = { ...config, time };
                                        setConfig(newConfig);
                                      }}
                                    >
                                      {formatTime12Hour(time)}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                              <div className="p-2">
                                <div className="text-xs font-medium text-muted-foreground mb-2">
                                  All Times (30 min intervals)
                                </div>
                                <div className="max-h-48 overflow-y-auto">
                                  {timeSlots.map((slot) => (
                                    <SelectItem
                                      key={slot.value}
                                      value={slot.value}
                                      className="text-sm"
                                    >
                                      <div className="flex justify-between items-center w-full">
                                        <span>{slot.label}</span>
                                        <span className="text-xs text-muted-foreground ml-2">
                                          {slot.value}
                                        </span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </div>
                              </div>
                            </SelectContent>
                          </Select>

                          {/* Manual time input overlay */}
                          <div className="mt-2">
                            <Label
                              htmlFor="manual-time"
                              className="text-xs text-muted-foreground"
                            >
                              Or enter time manually (24h format):
                            </Label>
                            <Input
                              id="manual-time"
                              type="time"
                              value={(config.time as string) || "09:00"}
                              onChange={(e) => {
                                const newConfig = {
                                  ...config,
                                  time: e.target.value,
                                };
                                setConfig(newConfig);
                              }}
                              className="mt-1 h-8 text-xs"
                              placeholder="HH:MM"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {config.frequency === "weekly" && (
                      <div className="space-y-2">
                        <Label htmlFor="dayOfWeek">Day of Week</Label>
                        <Select
                          value={(config.dayOfWeek as string) || "1"}
                          onValueChange={(value) => {
                            const newConfig = { ...config, dayOfWeek: value };
                            setConfig(newConfig);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Sunday</SelectItem>
                            <SelectItem value="1">Monday</SelectItem>
                            <SelectItem value="2">Tuesday</SelectItem>
                            <SelectItem value="3">Wednesday</SelectItem>
                            <SelectItem value="4">Thursday</SelectItem>
                            <SelectItem value="5">Friday</SelectItem>
                            <SelectItem value="6">Saturday</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {config.frequency === "monthly" && (
                      <div className="space-y-2">
                        <Label htmlFor="dayOfMonth">Day of Month</Label>
                        <Select
                          value={(config.dayOfMonth as string) || "1"}
                          onValueChange={(value) => {
                            const newConfig = { ...config, dayOfMonth: value };
                            setConfig(newConfig);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 31 }, (_, i) => (
                              <SelectItem key={i + 1} value={String(i + 1)}>
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Generated Schedule
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {generateCronExpression()}
                        </Badge>
                        {(() => {
                          const timeStr = config.time as string;
                          const frequency = config.frequency as string;
                          const dayOfWeek = config.dayOfWeek as string;
                          const dayOfMonth = config.dayOfMonth as string;

                          if (!timeStr) return null;

                          return (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>Runs at {formatTime12Hour(timeStr)}</span>
                              {frequency === "weekly" && dayOfWeek && (
                                <span>
                                  on{" "}
                                  {
                                    [
                                      "Sunday",
                                      "Monday",
                                      "Tuesday",
                                      "Wednesday",
                                      "Thursday",
                                      "Friday",
                                      "Saturday",
                                    ][parseInt(dayOfWeek)]
                                  }
                                </span>
                              )}
                              {frequency === "monthly" && dayOfMonth && (
                                <span>on day {dayOfMonth} of each month</span>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-sm">
                      Advanced Scheduling
                    </CardTitle>
                    <CardDescription>
                      Use cron expressions for precise timing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cron">Cron Expression</Label>
                      <Input
                        id="cron"
                        type="text"
                        value={(config.cron as string) || "0 9 * * *"}
                        onChange={(e) =>
                          setConfig({ ...config, cron: e.target.value })
                        }
                        placeholder="0 9 * * *"
                        className="font-mono"
                      />
                      <p className="text-xs text-muted-foreground">
                        Format: minute hour day month weekday
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div>
                        <p>
                          <strong>Examples:</strong>
                        </p>
                        <p>0 9 * * * - Daily at 9 AM</p>
                        <p>0 0 * * 1 - Weekly on Monday</p>
                        <p>0 12 1 * * - Monthly on 1st at noon</p>
                      </div>
                      <div>
                        <p>
                          <strong>Special values:</strong>
                        </p>
                        <p>* - Any value</p>
                        <p>0-59 - Minutes/Hours range</p>
                        <p>1-31 - Day of month</p>
                        <p>0-6 - Day of week (0=Sun)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={(config.timezone as string) || "UTC"}
                onValueChange={(value) =>
                  setConfig({ ...config, timezone: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">
                    Pacific Time
                  </SelectItem>
                  <SelectItem value="Europe/London">London</SelectItem>
                  <SelectItem value="Europe/Paris">Paris</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                  <SelectItem value="Asia/Shanghai">Shanghai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "api-call":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                API URL
              </label>
              <input
                type="url"
                value={(config.url as string) || ""}
                onChange={(e) => setConfig({ ...config, url: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://api.example.com/endpoint"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Method
              </label>
              <select
                value={(config.method as string) || "GET"}
                onChange={(e) =>
                  setConfig({ ...config, method: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Request Body (JSON)
              </label>
              <textarea
                value={(config.body as string) || ""}
                onChange={(e) => setConfig({ ...config, body: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder='{"key": "value"}'
              />
            </div>
          </div>
        );

      case "slack-message":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Webhook URL
              </label>
              <input
                type="url"
                value={(config.webhook_url as string) || ""}
                onChange={(e) =>
                  setConfig({ ...config, webhook_url: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://hooks.slack.com/services/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Channel
              </label>
              <input
                type="text"
                value={(config.channel as string) || ""}
                onChange={(e) =>
                  setConfig({ ...config, channel: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="#general"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                value={(config.message as string) || ""}
                onChange={(e) =>
                  setConfig({ ...config, message: e.target.value })
                }
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your message here..."
              />
            </div>
          </div>
        );

      case "if-else":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Condition
              </label>
              <input
                type="text"
                value={(config.condition as string) || ""}
                onChange={(e) =>
                  setConfig({ ...config, condition: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="variable_name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Operator
              </label>
              <select
                value={(config.operator as string) || "equals"}
                onChange={(e) =>
                  setConfig({ ...config, operator: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="equals">Equals</option>
                <option value="not_equals">Not Equals</option>
                <option value="greater_than">Greater Than</option>
                <option value="less_than">Less Than</option>
                <option value="contains">Contains</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Value
              </label>
              <input
                type="text"
                value={(config.value as string) || ""}
                onChange={(e) =>
                  setConfig({ ...config, value: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="comparison value"
              />
            </div>
          </div>
        );

      case "loop":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Iterations
              </label>
              <input
                type="number"
                value={(config.iterations as number) || 1}
                onChange={(e) =>
                  setConfig({ ...config, iterations: parseInt(e.target.value) })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
                max="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data Source
              </label>
              <input
                type="text"
                value={(config.dataSource as string) || ""}
                onChange={(e) =>
                  setConfig({ ...config, dataSource: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="array_variable_name"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500">
            No configuration options available for this node type.
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto theme-typography">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            {nodeData.nodeType === "schedule" && (
              <Clock className="h-5 w-5 theme-primary" />
            )}
            Configure {nodeData.label}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Set up the configuration for this {nodeData.nodeType} node.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">{renderConfigForm()}</div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="theme-typography"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="theme-gradient theme-typography"
          >
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
