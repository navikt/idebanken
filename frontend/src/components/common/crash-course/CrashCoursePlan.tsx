import { Part_Idebanken_Crash_Course_Plan } from '~/types/generated'
import { PartData } from '~/types/graphql-types'

export function CrashCoursePlan({
    common,
    meta,
    part,
}: PartData<Part_Idebanken_Crash_Course_Plan>) {
    console.log('CrashCoursePlan part config:', part.config)
    // TODO create a proper guillotine type before implementing this part
    return <div>CrashCoursePlan data: {JSON.stringify(part.config)}</div>
}
