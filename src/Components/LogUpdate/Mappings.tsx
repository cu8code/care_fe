import { DailyRoundsModel } from "../Patient/models";
import VitalsEditor from "./Vitals";

export type LogupdateComponentProps = {
    facilityId: string,
    patientId: string,
    consultationId: string,
    log: DailyRoundsModel,
    onChange: (log: DailyRoundsModel, sectionComplete?: boolean) => void
}

export enum LogUpdateType {
    Vitals = "vitals",
    NeurologicalMonitoring = "neurological monitoring",
    RespiratorySupport = "respiratory support",
    ArterialBloodGasAnalysis = "arterial blood gas analysis",
    BloodSugar = "blood sugar",
    IOBalance = "i/o balance",
    Dialysis = "dialysis",
    PressureSore = "pressure sore",
    NursingCare = "nursing care",
}

export type LogUpdateMapping = {
    type: LogUpdateType,
    component: React.FC<LogupdateComponentProps>
}

export const LogUpdateMappings: LogUpdateMapping[] = [
    {
        type: LogUpdateType.Vitals,
        component: VitalsEditor
    },
    {
        type: LogUpdateType.NeurologicalMonitoring,
        component: VitalsEditor
    },
    {
        type: LogUpdateType.RespiratorySupport,
        component: VitalsEditor
    },
    {
        type: LogUpdateType.ArterialBloodGasAnalysis,
        component: VitalsEditor
    },
    {
        type: LogUpdateType.BloodSugar,
        component: VitalsEditor
    },
    {
        type: LogUpdateType.IOBalance,
        component: VitalsEditor
    },
    {
        type: LogUpdateType.Dialysis,
        component: VitalsEditor
    },
    {
        type: LogUpdateType.PressureSore,
        component: VitalsEditor
    },
    {
        type: LogUpdateType.NursingCare,
        component: VitalsEditor
    }
];