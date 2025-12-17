"use client"
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";


export default function Home() {
  const [slug, setSlug] = useState("");
  const router = useRouter();
  return (
    <div className={styles.page}>
     <input type="text" placeholder="enter the room name" onChange={(e)=>{console.log(e.target.value); setSlug(e.target.value);}}/>
     <button onClick={()=>router.push(`/rooms/${slug}`)}>join room</button>
    </div>
  );
}
