import { createLazyFileRoute } from '@tanstack/react-router'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Bug } from 'lucide-react'

export const Route = createLazyFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="container p-2 mb-2 mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">About</h2>
        <p>
          This calculator provides a streamlined way to calculate both your Weighted Average Mark (WAM) and Grade Point Average (GPA) in one place. It was developed to offer Monash University students a more efficient and user-friendly alternative to the existing separate calculators.
        </p>
        <p className="text-sm text-muted-foreground">
          Note: This is an unofficial tool and while calculations are based on Monash University&apos;s published methodologies, results should be verified against official records.
        </p>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <p>
          The calculator uses Monash University&apos;s official calculation methods for both WAM and GPA. You can import your results via CSV or enter them manually, and see your calculations update in real-time.
        </p>

        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-medium mb-2">GPA Formula</h3>
            <div className="bg-muted p-4 rounded-md">
              <p className="font-mono text-sm">
                GPA = Σ(<code className="text-[#6f64a9]">g</code> &times; <code className="text-[#6f64a9]">c</code>) ÷ Σ<code className="text-[#6f64a9]">c</code>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">WAM Formula</h3>
            <div className="bg-muted p-4 rounded-md">
              {/* <div className="sm:hidden font-mono text-sm">
                <p>WAM = </p>
                <p className="pl-4">(</p>
                <p className="pl-8">Σ(<code className="text-[#6f64a9]">m₁</code> &times; <code className="text-[#6f64a9]">c₁</code> &times; 0.5) +</p>
                <p className="pl-8">Σ(<code className="text-[#6f64a9]">m₂</code> &times; <code className="text-[#6f64a9]">c₂</code> &times; 1.0)</p>
                <p className="pl-4">) ÷ (</p>
                <p className="pl-8">Σ(<code className="text-[#6f64a9]">c₁</code> &times; 0.5) +</p>
                <p className="pl-8">Σ(<code className="text-[#6f64a9]">c₂</code> &times; 1.0)</p>
                <p className="pl-4">)</p>
              </div> */}
              <p className="font-mono text-sm">
                WAM = (Σ(<code className="text-[#6f64a9]">m₁</code> &times; <code className="text-[#6f64a9]">c₁</code> &times; 0.5) + Σ(<code className="text-[#6f64a9]">m₂</code> &times; <code className="text-[#6f64a9]">c₂</code> &times; 1.0)) ÷ (Σ(<code className="text-[#6f64a9]">c₁</code> &times; 0.5) + Σ(<code className="text-[#6f64a9]">c₂</code> &times; 1.0))
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Where:</h4>
            <div className="bg-muted p-4 rounded-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <p><code className="text-[#6f64a9]">g</code> = grade value</p>
                <p><code className="text-[#6f64a9]">c</code> = credit points</p>
                <p><code className="text-[#6f64a9]">m₁</code> = first year mark</p>
                <p><code className="text-[#6f64a9]">c₁</code> = first year credit points</p>
                <p><code className="text-[#6f64a9]">m₂</code> = later year mark</p>
                <p><code className="text-[#6f64a9]">c₂</code> = later year credit points</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          All calculations are performed locally in your browser - no data is sent to any server.
        </p>

        <div className="space-y-2">
          <p className="text-lg font-medium">Official Monash Resources:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a href="https://www.monash.edu/students/admin/assessments/results/results-legend"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer">
                Results and Grades Legend
              </a>
            </li>
            <li>
              <a href="https://www.monash.edu/students/admin/assessments/results/gpa"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer">
                GPA Calculation Method
              </a>
            </li>
            <li>
              <a href="https://www.monash.edu/students/admin/assessments/results/wam"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer">
                WAM Calculation Method
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Calculate WAM and GPA simultaneously</li>
          <li>Bulk import results via CSV</li>
          <li>Real-time calculations</li>
          <li>Mobile-friendly interface</li>
        </ul>
      </section> */}

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Open Source</h2>
        <p>
          This project is open source and available on GitHub. Found a bug or have a suggestion? Feel free to contribute or raise an issue!
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button asChild variant="outline">
            <a
              href="https://github.com/ligsnf/monash-grades-calculator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.gitHub />
              <span>View on GitHub</span>
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/ligsnf/monash-grades-calculator/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Bug />
              <span>Report an Issue</span>
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}