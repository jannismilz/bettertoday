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
import { ChangeEvent, ReactNode, useState } from "react";
import ProjectTrackersForm from "./projectTrackersForm";
import RequiredStar from "./requiredStar";
import Image from "next/image";

export default function ProjectForm({
  children,
  project,
}: {
  children: ReactNode;
  project?: Project;
}) {
  const [createOpen, setCreateOpen] = useState(false);
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  function closeAfterTimeout() {
    setTimeout(() => setCreateOpen(false), 500);
  }

  function handleCoverUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];

      setCover(i);
      setCoverPreview(URL.createObjectURL(i));
    }
  }

  function resetValues() {
    setCover(null);
    setCoverPreview("");
    setTitle("");
    setDescription("");
  }

  return (
    <Drawer
      open={createOpen}
      onClose={resetValues}
      onOpenChange={setCreateOpen}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{project ? "Edit" : "Create"} a Project</DrawerTitle>
            <DrawerDescription>
              Get ready to measure and manage your progress.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-scroll p-4">
            <div className="grid gap-2">
              <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-60">
                Cover
              </p>
              <Label
                htmlFor="cover"
                className={`${!coverPreview && "h-32 w-full rounded-md bg-gray-200"}`}
              >
                {coverPreview && (
                  <img
                    src={coverPreview}
                    alt="Project cover preview"
                    className="h-32 w-full object-cover"
                  />
                )}
              </Label>
              <Input
                type="file"
                id="cover"
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => handleCoverUpload(e)}
              />
              <p className=" w-full">
                {coverPreview && (
                  <button
                    className="float-right text-sm text-red-400"
                    onClick={() => setCoverPreview("")}
                  >
                    Remove
                  </button>
                )}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">
                Title
                <RequiredStar />
              </Label>
              <Input
                type="text"
                id="title"
                required
                placeholder="Create vision board"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Building a visual represenation of my future"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DrawerFooter>
            <ProjectTrackersForm closeParent={closeAfterTimeout}>
              <Button>{project ? "Change" : "Create"}</Button>
            </ProjectTrackersForm>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
