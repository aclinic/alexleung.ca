import ExternalLink from "@/components/ExternalLink";
import { Subtitle } from "@/components/Subtitle";
import { Card } from "@/components/Card";

export function Credentials() {
  return (
    <section className="section-center">
      <Subtitle title="Credentials" id="credentials" />

      <div className="flex flex-col gap-6">
        {/* P.Eng. Credential */}
        <Card>
          <div className="flex items-start gap-4">
            <div className="text-3xl">🛠️</div>
            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Professional Engineer (P.Eng.)
              </h3>
              <p className="mb-2 text-lg">
                <ExternalLink href="https://www.peo.on.ca">
                  Professional Engineers Ontario (PEO)
                </ExternalLink>
              </p>
              <p className="leading-relaxed text-gray-300">
                Licensed Professional Engineer bringing engineering discipline,
                ethics, and accountability to software development and AI
                systems.
              </p>
            </div>
          </div>
        </Card>

        {/* Education Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Georgia Tech */}
          <Card>
            <div className="mb-4">
              <h3 className="mb-1 text-xl font-semibold">
                <ExternalLink href="https://ece.gatech.edu/">
                  Georgia Institute of Technology
                </ExternalLink>
              </h3>
              <p className="text-lg font-medium text-accent-warning">
                MSECE, Electrical & Computer Engineering
              </p>
              <p className="text-gray-300">2013 - 2016</p>
            </div>
            <div className="mb-3">
              <p className="text-lg font-medium text-accent-success">
                4.0 / 4.0 CGPA
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-300">
                <strong>Concentrations:</strong> Computer Engineering,
                Telecommunications
              </p>
            </div>
          </Card>

          {/* University of Waterloo */}
          <Card>
            <div className="mb-4">
              <h3 className="mb-1 text-xl font-semibold">
                <ExternalLink href="https://uwaterloo.ca/electrical-computer-engineering/">
                  University of Waterloo
                </ExternalLink>
              </h3>
              <p className="text-lg font-medium text-accent-warning">
                BASc, Electrical Engineering & Pure Mathematics
              </p>
              <p className="text-gray-300">2008 - 2013</p>
            </div>
            <div className="mb-3">
              <p className="text-lg font-medium text-accent-success">
                92.3% CGPA
              </p>
              <div className="text-sm text-accent-info">
                <p>• With Distinction</p>
                <p>• Dean&apos;s Honours List</p>
                <p>• 8x Term Dean&apos;s Honours List</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-300">
                <strong>Concentrations:</strong> Control Theory, Electric Power,
                Mathematics
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
