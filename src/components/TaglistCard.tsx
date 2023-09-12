import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

const allTags = ["Meter", "Info", "Address", "Mismatch", "New", "Deprecated"];

export const TaglistCard: React.FC = () => {
  const [tags, setTags] = useState<string[]>([
    "Meter",
    "Info",
    "Address",
    "Mismatch",
  ]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Card className="w-[28rem]">
      <CardHeader>
        <CardTitle>SCR_FND_MTR_HILO_FAILED</CardTitle>
        <CardDescription>High/Low Check Failed</CardDescription>
        {/* <Button>
          <i className="fa-solid fa-edit mr-2" /> Edit
        </Button> */}
      </CardHeader>
      <CardFooter className="grid gap-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} className="group">
              {tag}
              <button
                onClick={() => setTags((prev) => prev.filter((i) => i !== tag))}
              >
                <i className="fa-solid fa-circle-xmark ml-2 hover:text-destructive transition-colors"></i>
              </button>
            </Badge>
          ))}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                onClick={() => setOpen(true)}
                className="flex items-center justify-center"
              >
                <Badge
                  variant={open ? "default" : "secondary"}
                  className="hover:bg-primary hover:text-primary-foreground h-full"
                >
                  <i className="fa-solid fa-circle-plus mr-2"></i> Add Tag
                </Badge>
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput
                  value={value}
                  onValueChange={setValue}
                  placeholder="Add a tag..."
                />
                <CommandEmpty>Create a New Tag</CommandEmpty>
                <CommandGroup>
                  {allTags
                    .filter((i) => !tags.includes(i))
                    .map((allTag) => (
                      <CommandItem
                        key={allTag}
                        value={allTag}
                        onSelect={() => {
                          setTags((prev) => [...prev, allTag]);
                          setOpen(false);
                        }}
                      >
                        {allTag}
                      </CommandItem>
                    ))}
                  {value.length > 0 && !tags.includes(value) && (
                    <CommandItem
                      value={value}
                      onSelect={() => {
                        setTags((prev) => [...prev, value]);
                        setOpen(false);
                      }}
                    >
                      {value}
                    </CommandItem>
                  )}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardFooter>
    </Card>
  );
};
