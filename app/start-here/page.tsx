import Link from "next/link";

export const metadata = { title: "Start Here", description: "First-time Smokies trip guidance." };

export default function StartHerePage() {
  return (
    <div className="container" style={{ padding: "2rem 0 6rem" }}>
      <h1>Start Here</h1>
      <p style={{ maxWidth: "48ch" }}>
        New to the Smokies? Pick a base, decide park days versus attraction days, and save a few anchors. Then open My Plan and shape the days.
      </p>
      <ol style={{ maxWidth: "48ch", lineHeight: 1.7 }}>
        <li><Link href="/stay">Choose where to stay</Link></li>
        <li><Link href="/go">Pick one or two park areas</Link></li>
        <li><Link href="/do">Add two or three activities</Link></li>
        <li><Link href="/my-plan">Build the days in My Plan</Link></li>
      </ol>
    </div>
  );
}