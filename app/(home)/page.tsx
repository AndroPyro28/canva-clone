import AiFeatures from "./components/ai-features";
import { Banner } from "./components/banner";
import DesignTypes from "./components/design-types";
import RecentDesigns from "./components/recent-designs";

export default function Home() {
  return <>
    <Banner />
    <DesignTypes />
    <AiFeatures />
    <RecentDesigns />
  </>
}
