import Link from 'next/link'
import { FC } from 'react'
import { Transition } from '@headlessui/react'

import PlanCard from './Plans/PlanCard'
import { formatTierOptions } from './PlanSelection.utils'
import { Button, IconExternalLink } from 'ui'
import PlanCardEnterprise from './Plans/PlanCardEnterprise'

interface Props {
  visible: boolean
  tiers: any[]
  currentPlan?: any
  onSelectPlan: (plan: any) => void
}

const PlanSelection: FC<Props> = ({ visible, tiers, currentPlan, onSelectPlan }) => {
  const formattedTiers = formatTierOptions(tiers)

  const enterprisePlan = formattedTiers.find((it) => it.name === 'Enterprise')!

  return (
    <Transition
      show={visible}
      enter="transition ease-out duration-300"
      enterFrom="transform opacity-0 -translate-x-10"
      enterTo="transform opacity-100 translate-x-0"
    >
      <div>
        <h4 className="text-lg">Change your project's subscription</h4>
        <div className={`grid py-8 grid-cols-1 gap-8 md:grid-cols-3`}>
          {formattedTiers
            .filter((it) => it.name !== 'Enterprise')
            .map((plan) => {
              return (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  currentPlan={currentPlan}
                  onSelectPlan={() => onSelectPlan(plan)}
                />
              )
            })}
        </div>
        <div>
          <PlanCardEnterprise
            plan={enterprisePlan}
            currentPlan={currentPlan}
            onSelectPlan={() => onSelectPlan(enterprisePlan)}
          />
        </div>
        <div className="flex justify-center items-center mt-4">
          <Link href="https://supabase.com/pricing">
            <a target="_blank" rel="noreferrer">
              <Button
                type="link"
                icon={<IconExternalLink size={14} strokeWidth={1.5} />}
                className="text-sm text-scale-1000 hover:text-scale-1100 hover:bg-scale-400"
              >
                See detailed comparisons across plans
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </Transition>
  )
}

export default PlanSelection
