"use client";
import { FormEvent, useState, useEffect } from "react";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RotateCw } from "lucide-react";
import { useToast } from "./ui/use-toast";

const EmailSchema = z.string().email();

export default function Newsletter() {
  const [emailInput, setEmailInput] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (message) {
      toast({ description: message });
    }
  }, [message, toast]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate email using Zod
      EmailSchema.parse(emailInput);
    } catch (error) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setButtonLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage(
          "Joined successfully. Thank you for subscribing to our Newsletter!"
        );
      } else {
        throw new Error(
          data?.error || "Something went wrong, please try again later"
        );
      }
    } catch (e) {
      setMessage((e as Error).message);
    }

    setEmailInput("");
    setButtonLoading(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col md:flex-row gap-2">
          <Input
            type="email"
            name="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Enter your email"
            className="text-gray-600"
          />
          <Button disabled={buttonLoading}>
            {buttonLoading ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                Subscribing
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
