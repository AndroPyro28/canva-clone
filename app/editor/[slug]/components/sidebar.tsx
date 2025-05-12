"use client";
import {
  ArrowLeft,
  ChevronLeft,
  Grid,
  Pencil,
  Settings,
  Sparkle,
  Type,
  Upload,
} from "lucide-react";
import React, { act, useState } from "react";
import { TextPanel } from "./panels/text-panels";
import { ElementsPanel } from "./panels/elements-panel";
import { UploadPanel } from "./panels/upload-panels";
import { DrawingPanel } from "./panels/drawing-panel";
import { SettingsPanel } from "./panels/settings-panels";
import { AiPanel } from "./panels/ai-panels";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  const [activeSidebar, setActiveSidebar] = useState<null | string>(null);

  const sidebarItems = [
    {
      id: "elements",
      icon: Grid,
      label: "Elements",
      panel: <ElementsPanel />,
    },
    {
      id: "text",
      icon: Type,
      label: "Text",
      panel: <TextPanel />,
    },
    {
      id: "uploads",
      icon: Upload,
      label: "Uploads",
      panel: <UploadPanel />,
    },
    {
      id: "draw",
      icon: Pencil,
      label: "Draw",
      panel: <DrawingPanel />,
    },
    {
      id: "ai",
      icon: Sparkle,
      label: "AI",
      panel: <AiPanel />,
    },

    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      panel: <SettingsPanel />,
    },
  ];
  const handleItemClick = (itemId: string) => {
    if (itemId === activeSidebar && !isPanelCollapsed) {
      setActiveSidebar(null);
      setIsPanelCollapsed(true);
    } else {
      setActiveSidebar(itemId);
      setIsPanelCollapsed(false);
    }
  };

  const activeItem = sidebarItems.find((item) => item.id === activeSidebar);

  const closeSecondaryPanel = () => {
    setActiveSidebar(null);
  };

  const togglePanelCollapsed = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setActiveSidebar(null);
    setIsPanelCollapsed(!isPanelCollapsed);
  };

  return (
    <div className="flex h-full ">
      <aside className="sidebar">
        {sidebarItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={cn(
              "sidebar-item",
              activeSidebar === item.id && "active"
            )}
          >
            <item.icon className="sidebar-item-icon size-5" />
            <span className="sidebar-item-label">{item.label}</span>
          </div>
        ))}
      </aside>
      <div
        className={cn(
          "secondary-panel w-0 opacity-0 overflow-hidden",
          activeSidebar &&
            !isPanelCollapsed &&
            "w-[320px] overflow-visible opacity-100"
        )}
      >
        <div className="panel-header">
          <button className="back-button" onClick={closeSecondaryPanel}>
            <ArrowLeft className="size-5" />
          </button>
          <span className="panel-title">{activeItem?.label}</span>
        </div>
        <div className="panel-content">{activeItem?.panel}</div>
        <button className="collapse-button" onClick={togglePanelCollapsed}>
          <ChevronLeft className="size-5" />
        </button>
      </div>
    </div>
  );
};
