import { Transition } from "@headlessui/react";
import { Loader2 } from "lucide-react";
import { Logo } from "./logo";

interface LaunchScreenProps {
  isLoading: boolean;
}

export function LaunchScreen({ isLoading }: LaunchScreenProps) {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className=" fixed top-0 left-0 w-full h-full grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <Logo className="h-10 " />
          <p>Task.ai</p>
          <Loader2 className="animate-spin text-white size-6" />
        </div>
      </div>
    </Transition>
  );
}
