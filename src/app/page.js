// pages/index.js or pages/home.js

import Image from "next/image"; // Only if you're using it
import Link from "next/link"; // Make sure to import Link
import HomePage from "../Pages/HomePage";

export default function Home() {
  return (
    <>
    <HomePage/>
    </>
  );
}
