"use client";

import React, { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUp } from "lucide-react";
import { TodoForm } from "./forms/todos/todo-form";

export default function TodoBottomCard() {
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleImmediateAdd = async () => {
    console.log("Criando ToDo imediatamente:", title);
    setTitle("");
  };

  const handleFormSubmit = async (values: any) => {
    console.log("Form submitted with values:", values);
    setIsFormOpen(false);
  };

  return (
    <>
      <form
        className="fixed bottom-0 left-0 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(async () => {
            await handleImmediateAdd();
          });
        }}
      >
        <Card className="flex flex-col md:hidden w-full border-t border-gray-200 p-4 shadow-sm">
          <div className="flex flex-col gap-4">
            <Input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Escreva..."
              className="w-full border-0"
            />
            <div className="flex justify-end gap-2">
              <Button type="submit" variant="outline" className="rounded-full" disabled={isPending}>
                <Plus className="h-4 w-4" />
              </Button>
              <Button 
                type="button" 
                onClick={() => setIsFormOpen(true)} 
                variant="outline" 
                className="rounded-full"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </form>

      <TodoForm 
        isOpen={isFormOpen} 
        onOpenChange={setIsFormOpen}
        handleSubmit={handleFormSubmit}
      />
    </>
  );
}
