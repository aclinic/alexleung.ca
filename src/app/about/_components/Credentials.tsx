import { Card } from "@/components/Card";
import ExternalLink from "@/components/ExternalLink";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { SectionBlock } from "@/components/SectionBlock";

export function Credentials() {
  return (
    <ResponsiveContainer element="section">
      <SectionBlock title="Credentials" titleId="credentials">
        <p className="mb-6 leading-relaxed text-gray-300">
          I try to bring rigor, accountability, and pragmatism to technology
          work, shaped by my training and experience.
        </p>

        <div className="flex flex-col gap-6">
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
                  Licensed in Ontario. I apply engineering discipline and ethics
                  to software and AI systems.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <div className="mb-4">
                <h3 className="mb-1 text-xl font-semibold">
                  <ExternalLink href="https://ece.gatech.edu/">
                    Georgia Institute of Technology
                  </ExternalLink>
                </h3>
                <p className="text-lg font-medium text-white">
                  MSECE, Electrical & Computer Engineering
                </p>
                <p className="text-gray-300">2013 - 2016</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">
                  <strong>Concentrations:</strong> Computer Engineering,
                  Telecommunications
                </p>
              </div>
            </Card>

            <Card>
              <div className="mb-4">
                <h3 className="mb-1 text-xl font-semibold">
                  <ExternalLink href="https://uwaterloo.ca/electrical-computer-engineering/">
                    University of Waterloo
                  </ExternalLink>
                </h3>
                <p className="text-lg font-medium text-white">
                  BASc, Electrical Engineering & Pure Mathematics
                </p>
                <p className="text-gray-300">2008 - 2013</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">
                  <strong>Concentrations:</strong> Control, Power, Mathematics
                </p>
              </div>
            </Card>
          </div>
        </div>
      </SectionBlock>
    </ResponsiveContainer>
  );
}
