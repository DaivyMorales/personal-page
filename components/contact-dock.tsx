"use client";

import { motion } from "motion/react";
import Image from "next/image";
import portrait from "@/assets/daivy.jpg";
import { Magnetic } from "@/components/motion/chrome";
import { site } from "@/content/site";

/**
 * A round badge in the corner, like si.gov's "Menu" button: your photo in the middle and
 * a line of text slowly turning around it. Clicking it starts an email.
 */
export function ContactDock() {
  const ring = `${site.name} · ${site.tagline} · Email me · `.toUpperCase();
  return (
    <motion.div
      className="contact-dock fixed right-5 bottom-5 z-20 sm:right-8 sm:bottom-8"
      initial={{ scale: 0, rotate: -90, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 16, delay: 1.6 }}
    >
      <Magnetic strength={0.25}>
        <motion.a
          href={`mailto:${site.email}`}
          aria-label={`Email ${site.name}`}
          className="badge group"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <svg viewBox="0 0 100 100" className="badge-ring" aria-hidden="true">
            <defs>
              <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            <text>
              <textPath href="#badge-circle" textLength="238" lengthAdjust="spacing">
                {ring}
              </textPath>
            </text>
          </svg>
          <Image
            src={portrait}
            alt=""
            width={56}
            height={56}
            sizes="56px"
            placeholder="blur"
            preload
            className="badge-photo"
          />
          <span className="badge-hover" aria-hidden="true">
            Email
          </span>
        </motion.a>
      </Magnetic>
    </motion.div>
  );
}
