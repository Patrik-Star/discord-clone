"use client"

import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip"

const NavigationAction = () => {
    return (
        <div className="">
            <ActionTooltip side="right" align="center" label="Add a server">
                <button className="group flex items-center">
                    <div className="flex mx-4 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
                        <Plus className="group-hover:text-white transition text-emerald-500" size={25} />
                    </div>  
                </button>
            </ActionTooltip>
        </div>
    );
}

export default NavigationAction;

// TODO: npx shadcn-ui@latest add separator
// TODO: npx shadcn-ui@latest add tooltip