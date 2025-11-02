import { useParams } from "react-router-dom";
import { demos } from "../data/demos";
import { DemoLayout } from "../components/layouts/DemoLayout";

export function DemoPage() {
  const { demoId } = useParams();
  const demo = demos.find((d) => d.id === demoId);

  if (!demo) {
    return (
      <div className="text-center text-red-400 mt-20">Demo not found.</div>
    );
  }

  return (
    <DemoLayout
      title={demo.title}
      desc={demo.desc}
      codeUrl="https://example.com/code"
      repoUrl="https://github.com/a2zblocks/example"
      contractUrl="https://etherscan.io/address/0x123"
    >
      {/* This is where the actual UI for each demo will go later */}
      <div className="text-center">
        <p>👋 Hello from {demo.title} demo!</p>
        <button className="btn btn-primary mt-4">Fake Action</button>
      </div>
    </DemoLayout>
  );
}
