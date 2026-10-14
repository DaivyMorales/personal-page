"use client";

import { motion } from "motion/react";
import Image from "next/image";
import portrait from "@/assets/daivy.jpg";
import { Magnetic } from "@/components/motion/chrome";
import { site } from "@/content/site";

/** Floating bar at the bottom of the screen: your photo and a magnetic email button. */
export function ContactDock() {
  return (
    <motion.div
      className="contact-dock pointer-events-none fixed inset-x-0 bottom-5 z-20 flex justify-center px-4"
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 18, delay: 1.4 }}
    >
      <div className="pointer-events-auto flex items-center gap-1 rounded-[7px] border border-rule bg-ground p-1">
        <motion.div
          whileHover={{ rotate: -6, scale: 1.12 }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
        >
          <Image
            src={portrait}
            alt={`Portrait of ${site.name}`}
            width={36}
            height={36}
            sizes="36px"
            preload
            className="size-9 rounded-[4px] object-cover grayscale transition-[filter] duration-500 hover:grayscale-0"
          />
        </motion.div>
        <Magnetic>
          <motion.a
            href={`mailto:${site.email}`}
            className="flex h-9 items-center rounded-[4px] bg-bosque px-3.5 text-[0.8em] text-crema no-underline transition-colors hover:bg-carbon"
            whileTap={{ scale: 0.94 }}
          >
            Reach out via email
          </motion.a>
        </Magnetic>
      </div>
    </motion.div>
  );
}
