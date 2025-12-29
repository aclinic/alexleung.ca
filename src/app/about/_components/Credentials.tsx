import ExternalLink from "@/components/ExternalLink";
import { Subtitle } from "@/components/Subtitle";

export function Credentials() {
  return (
    <section className="section-center">
      <Subtitle title="Credentials" id="credentials" />

      <div className="pt-8">
        {/* P.Eng. Credential */}
        <div className="mb-12 p-6 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🛠️</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Professional Engineer (P.Eng.)
              </h3>
              <p className="text-lg mb-2">
                <ExternalLink href="https://www.peo.on.ca">
                  Professional Engineers Ontario (PEO)
                </ExternalLink>
              </p>
              <p className="text-gray-300 leading-relaxed">
                Licensed Professional Engineer bringing engineering discipline,
                ethics, and accountability to software development and AI
                systems.
              </p>
            </div>
          </div>
        </div>

        {/* Education Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Georgia Tech */}
          <div className="p-6 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-1">
                <ExternalLink href="https://ece.gatech.edu/">
                  Georgia Institute of Technology
                </ExternalLink>
              </h3>
              <p className="text-lg text-yellow-300 font-medium">
                MSECE, Electrical & Computer Engineering
              </p>
              <p className="text-gray-300">2013 - 2016</p>
            </div>
            <div className="mb-3">
              <p className="text-lg font-medium text-green-300">
                4.0 / 4.0 CGPA
              </p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">
                <strong>Concentrations:</strong> Computer Engineering,
                Telecommunications
              </p>
            </div>
          </div>

          {/* University of Waterloo */}
          <div className="p-6 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-1">
                <ExternalLink href="https://uwaterloo.ca/electrical-computer-engineering/">
                  University of Waterloo
                </ExternalLink>
              </h3>
              <p className="text-lg text-yellow-300 font-medium">
                BASc, Electrical Engineering & Pure Mathematics
              </p>
              <p className="text-gray-300">2008 - 2013</p>
            </div>
            <div className="mb-3">
              <p className="text-lg font-medium text-green-300">92.3% CGPA</p>
              <div className="text-sm text-blue-300">
                <p>• With Distinction</p>
                <p>• Dean&apos;s Honours List</p>
                <p>• 8x Term Dean&apos;s Honours List</p>
              </div>
            </div>
            <div>
              <p className="text-gray-300 text-sm">
                <strong>Concentrations:</strong> Control Theory, Electric Power,
                Mathematics
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
