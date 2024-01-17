"use client";

import { Project } from "@/db/schemas/Projects";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ReactNode, useState } from "react";

export default function ProjectTrackersForm({
  children,
  closeParent,
}: {
  children: ReactNode;
  closeParent: () => void;
}) {
  const [trackersOpen, setTrackersOpen] = useState(false);

  return (
    <Drawer open={trackersOpen} onOpenChange={setTrackersOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto h-3/5 w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Trackers</DrawerTitle>
            <DrawerDescription>
              Add optimal trackers to achieve your goal.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-scroll p-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input type="text" id="title" placeholder="Create vision board" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Creating a visual represenation of my future"
              />
            </div>
          </div>
          <DrawerFooter>
            <Button>Save</Button>
            <DrawerClose asChild>
              <Button variant="outline" onClick={closeParent}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
