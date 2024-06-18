import { useState } from "react"
import routes from "../../Redux/api"
import useQuery from "../../Utils/request/useQuery"
import { formatDateTime } from "../../Utils/utils"
import PageTitle from "../Common/PageTitle"
import { LogUpdateMappings, LogUpdateType } from "./Mappings"
import ButtonV2 from "../Common/components/ButtonV2"

export default function LogUpdateForm(props: {
    facilityId: string,
    patientId: string,
    consultationId: string
}) {

    const { facilityId, patientId, consultationId } = props
    const preset: LogUpdateType[] = [LogUpdateType.Vitals, LogUpdateType.NeurologicalMonitoring, LogUpdateType.RespiratorySupport, LogUpdateType.ArterialBloodGasAnalysis, LogUpdateType.BloodSugar, LogUpdateType.IOBalance, LogUpdateType.Dialysis, LogUpdateType.PressureSore, LogUpdateType.NursingCare]

    const [completedSections, setCompletedSections] = useState<LogUpdateType[]>([])
    const [currentSection, setCurrentSection] = useState<number>(0)

    const patientQuery = useQuery(routes.getPatient, {
        pathParams: {
            id: patientId
        }
    })

    const consultationQuery = useQuery(routes.getConsultation, {
        pathParams: {
            id: consultationId
        }
    })

    const patient = patientQuery.data
    const consultation = consultationQuery.data
    const facility = patient?.facility_object;

    return (
        <div className="h-[200vh]">
            <PageTitle
                title="Log Update"
                className="sm:m-0 sm:p-0"
                crumbsReplacements={{
                    [facilityId]: { name: facility?.name },
                    [patientId]: { name: patient?.name },
                    [consultationId]: {
                        name:
                            consultation?.suggestion === "A"
                                ? `Admitted on ${formatDateTime(
                                    consultation?.encounter_date!,
                                )}`
                                : consultation?.suggestion_text,
                    },
                }}
                breadcrumbs={true}
                backUrl="/patients"
            />
            <div className="sticky top-4 inset-x-0 bg-white/50 backdrop-blur border border-gray-200 flex items-center justify-between rounded-xl overflow-hidden">
                <div className="flex gap-2 flex-1 overflow-auto items-center">
                    {preset.map((type, index) => (
                        <button
                            key={index}
                            className={`py-3 px-5 text-sm flex capitalize relative text-center overflow-hidden group hover:bg-black/5 ${currentSection === index ? "text-primary-500 font-bold" : ""} transition-all`}
                            onClick={() => setCurrentSection(index)}
                        >
                            <div className="whitespace-nowrap">
                                {type}
                            </div>
                            <div
                                className={`h-[3px] w-[30px] rounded-t-lg ${currentSection === index ? "bg-primary-500 bottom-0" : "bg-gray-500 -bottom-[3px] group-hover:bottom-0"} absolute left-[calc(50%-15px)] transition-all`}
                            />
                        </button>
                    ))}
                </div>
                <div className="px-2 shrink-0">
                    <ButtonV2
                        onClick={() => { }}
                    >
                        Save
                    </ButtonV2>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <h2 className="text-xl font-semibold">
                        General
                    </h2>
                    General Stuff here
                </div>
                {preset.map((type, index) => {
                    const mapping = LogUpdateMappings.find((m) => m.type === type);
                    if (!mapping) return null;
                    const Component = mapping.component;
                    return (
                        <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h2 className="text-xl font-semibold">
                                Vitals
                            </h2>
                            <Component
                                facilityId={facilityId}
                                patientId={patientId}
                                consultationId={consultationId}
                                log={{}}
                                onChange={(log) => {
                                    const newSections = completedSections.filter((s) => s !== type);
                                    newSections.push(type);
                                    setCompletedSections(newSections);
                                }}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}