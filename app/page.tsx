import Image from "next/image";
import Link from "next/link";

const planningLanes = [
  {
    title: "Go",
    href: "/go",
    image: "/images/homepage/lane-go-mount-le-conte.jpg",
    alt: "Mount Le Conte rising above layered green ridges in summer",
    copy: "Roads, parking, timing and the order that keeps the day moving.",
  },
  {
    title: "Do",
    href: "/do",
    image: "/images/homepage/lane-do-grotto-falls.jpg",
    alt: "Grotto Falls flowing over a mossy rock ledge in the Smokies",
    copy: "Hikes, attractions and family activities sorted by the trip you are taking.",
  },
  {
    title: "See",
    href: "/see",
    image: "/images/homepage/lane-see-black-bear.jpg",
    alt: "A black bear standing among green vegetation in Great Smoky Mountains National Park",
    copy: "Views, wildlife and landmarks worth building the day around.",
  },
  {
    title: "Eat",
    href: "/eat",
    image: "/images/homepage/lane-eat-gregg-cable-house.jpg",
    alt: "The historic Gregg-Cable House surrounded by trees in Cades Cove",
    copy: "Local meals and practical stops without wasting half the day in line.",
  },
  {
    title: "Stay",
    href: "/stay",
    image: "/images/homepage/lane-stay-noah-ogle-cabin.jpg",
    alt: "The Noah Bud Ogle log cabin framed by autumn trees",
    copy: "Choose the right base before traffic turns a short drive into the whole evening.",
  },
  {
    title: "Deals",
    href: "/deals",
    image: "/images/homepage/lane-deals-winter-stream.jpg",
    alt: "A quiet Smokies stream bordered by fresh winter snow",
    copy: "Verified savings and seasonal value without fake urgency.",
  },
];

const towns = [
  {
    name: "Gatlinburg",
    image: "/images/homepage/town-gatlinburg.jpg",
    alt: "An aerial view of downtown Gatlinburg with the Smoky Mountains behind it",
    copy: "Walkable attractions at the park’s busiest gateway.",
  },
  {
    name: "Pigeon Forge",
    image: "/images/homepage/town-pigeon-forge.jpg",
    alt: "The Parkway through Pigeon Forge with shops and traffic lights",
    copy: "Family attractions, shows and the main Parkway.",
  },
  {
    name: "Sevierville",
    image: "/images/homepage/town-sevierville.jpg",
    alt: "Historic Court Avenue storefronts in downtown Sevierville",
    copy: "A practical base with history, shopping and easier access north.",
  },
  {
    name: "Townsend",
    image: "/images/homepage/town-townsend.jpg",
    alt: "The Little River near the Townsend entrance to Great Smoky Mountains National Park",
    copy: "The quieter side for river days, Cades Cove and slower mornings.",
  },
];

const guides = [
  {
    title: "Your First Smokies Trip",
    href: "/start-here",
    image: "/images/homepage/guide-first-trip-newfound-gap.jpg",
    alt: "Autumn leaves framing a mountain view at Newfound Gap",
    copy: "Start with the few decisions that shape the rest of the trip.",
  },
  {
    title: "Waterfall Days",
    href: "/see",
    image: "/images/homepage/guide-waterfalls-ramsey-cascades.jpg",
    alt: "Ramsey Cascades dropping through a green forest",
    copy: "Match the walk, weather and time commitment before you leave the cabin.",
  },
  {
    title: "Quieter Routes",
    href: "/go",
    image: "/images/homepage/guide-quiet-side-cataloochee.jpg",
    alt: "Cataloochee Creek flowing beneath colorful autumn trees",
    copy: "Build a slower day beyond the busiest Parkway stops.",
  },
  {
    title: "Smokies With Kids",
    href: "/do",
    image: "/images/homepage/guide-kids-salamander.jpg",
    alt: "A spring salamander resting on wet leaves in the Smokies",
    copy: "Choose short wins, room to move and a backup before everyone is tired.",
  },
  {
    title: "Rainy-Day Backup",
    href: "/do",
    image: "/images/homepage/guide-rainy-day-cascade.jpg",
    alt: "A small cascade rushing between mossy rocks in the forest",
    copy: "Keep the trip moving when the forecast changes the plan.",
  },
  {
    title: "Scenic Drives",
    href: "/go",
    image: "/images/homepage/guide-scenic-drives-misty-sunset.jpg",
    alt: "Misty mountain ridges fading into a Smokies sunset",
    copy: "Pick the drive by daylight, traffic and what you want to see.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero" aria-labelledby="home-hero-title">
        <Image
          className="home-hero__image"
          src="/images/homepage/hero-kuwohi.jpg"
          alt="Layered blue ridges of the Great Smoky Mountains beneath a warm sunset sky"
          fill
          priority
          sizes="100vw"
        />
        <div className="home-hero__overlay" />
        <div className="container home-hero__content">
          <p className="eyebrow">Independent Smokies field guide</p>
          <h1 id="home-hero-title">Plan your Smokies trip without the guesswork.</h1>
          <p className="home-hero__lede">
            Make better choices across Gatlinburg, Pigeon Forge, Sevierville, Townsend and Great Smoky Mountains National Park.
          </p>
          <div className="button-row">
            <Link className="button button--primary" href="/start-here">
              Start planning
            </Link>
            <Link className="button button--secondary" href="/my-plan">
              Open My Plan
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="planning-lanes-title">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow eyebrow--dark">Build the trip by decision</p>
            <h2 id="planning-lanes-title">Six ways into the Smokies</h2>
            <p>Start with the part of the trip you need to solve now. Save what fits and keep moving.</p>
          </div>

          <div className="planning-grid">
            {planningLanes.map((lane) => (
              <Link className="photo-card photo-card--lane" href={lane.href} key={lane.title}>
                <div className="photo-card__media">
                  <Image src={lane.image} alt={lane.alt} fill sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw" />
                </div>
                <div className="photo-card__body">
                  <h3>{lane.title}</h3>
                  <p>{lane.copy}</p>
                  <span aria-hidden="true">Explore {lane.title.toLowerCase()} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="value-strip" aria-label="Why use SmokyInsider">
        <div className="container value-strip__grid">
          <div>
            <strong>Local planning judgment</strong>
            <span>Practical tradeoffs, not a directory dump.</span>
          </div>
          <div>
            <strong>One trip plan</strong>
            <span>Save useful stops while you browse.</span>
          </div>
          <div>
            <strong>Visible trust rules</strong>
            <span>Official park facts and sponsored content stay clearly separated.</span>
          </div>
        </div>
      </section>

      <section className="home-section home-section--cream" aria-labelledby="towns-title">
        <div className="container">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow eyebrow--dark">Choose your base</p>
              <h2 id="towns-title">Four gateways. Four different trips.</h2>
            </div>
            <p>Where you stay changes your drive time, pace and what fits into each day.</p>
          </div>

          <div className="town-grid">
            {towns.map((town) => (
              <Link className="town-card" href="/go" key={town.name}>
                <div className="town-card__media">
                  <Image src={town.image} alt={town.alt} fill sizes="(min-width: 960px) 25vw, (min-width: 560px) 50vw, 100vw" />
                </div>
                <div className="town-card__body">
                  <h3>{town.name}</h3>
                  <p>{town.copy}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="before-you-go-title">
        <div className="container">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow eyebrow--dark">Before you go</p>
              <h2 id="before-you-go-title">Solve the problems that can wreck the day.</h2>
            </div>
            <p>Use these starting points to make the hard decisions before traffic, weather or tired kids make them for you.</p>
          </div>

          <div className="guide-grid">
            {guides.map((guide) => (
              <Link className="guide-card" href={guide.href} key={guide.title}>
                <div className="guide-card__media">
                  <Image src={guide.image} alt={guide.alt} fill sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw" />
                </div>
                <div className="guide-card__body">
                  <h3>{guide.title}</h3>
                  <p>{guide.copy}</p>
                  <span aria-hidden="true">Read the guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="plan-band" aria-labelledby="my-plan-title">
        <div className="container plan-band__inner">
          <div>
            <p className="eyebrow">Keep the useful parts</p>
            <h2 id="my-plan-title">Build one plan while you browse.</h2>
            <p>Save places, group the day and catch conflicts before you arrive.</p>
          </div>
          <Link className="button button--primary" href="/my-plan">
            Open My Plan
          </Link>
        </div>
      </section>

      <section className="home-trust" aria-labelledby="trust-title">
        <div className="container home-trust__inner">
          <div>
            <h2 id="trust-title">Independent by design</h2>
            <p>
              SmokyInsider is not affiliated with the National Park Service. Park facts are drawn from official sources with visible verification dates. Editorial and sponsored content remain separate.
            </p>
          </div>

          <details className="photo-credits">
            <summary>Homepage photo credits and licenses</summary>
            <div className="photo-credits__body">
              <p>National Park photographs are credited to the National Park Service and used under the public-domain rule stated on each NPS media detail page.</p>
              <ul>
                <li>
                  Gatlinburg aerial by Dswitz10734, licensed under{" "}
                  <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>.
                </li>
                <li>
                  Pigeon Forge Parkway by Brian Stansberry, licensed under{" "}
                  <a href="https://creativecommons.org/licenses/by/2.5/" target="_blank" rel="noreferrer">CC BY 2.5</a>.
                </li>
                <li>
                  Court Avenue in Sevierville by Brian Stansberry, licensed under{" "}
                  <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY 3.0</a>.
                </li>
                <li>Little River near Townsend by Jan Kronsell, released into the public domain.</li>
              </ul>
              <p>
                Full source pages, download URLs, rights records, dimensions and file hashes are stored in the repository’s homepage visual asset manifest.
              </p>
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
