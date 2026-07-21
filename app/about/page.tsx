export const metadata = { title: "About", description: "Independent Smoky Mountains planning site." };

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: "2rem 0 6rem" }}>
      <h1>About SmokyInsider</h1>
      <p style={{ maxWidth: "52ch" }}>
        SmokyInsider is an independent trip-planning utility for Sevier County, Townsend, and Great Smoky Mountains National Park. It exists to turn scattered information into working days.
      </p>
      <p style={{ maxWidth: "52ch" }}>
        This site is not affiliated with the National Park Service, Great Smoky Mountains National Park, or any tourism board. Park facts come from official sources and carry visible verification dates.
      </p>
      <p style={{ maxWidth: "52ch", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
        Publisher and contact details are placeholders pending final confirmation.
      </p>
    </div>
  );
}