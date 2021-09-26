import { DateTime } from 'luxon';
import { AiFillWarning, AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import AST from '../assets/img/jobs/AST.webp';
import BLM from '../assets/img/jobs/BLM.webp';
import BRD from '../assets/img/jobs/BRD.webp';
import DNC from '../assets/img/jobs/DNC.webp';
import DRG from '../assets/img/jobs/DRG.webp';
import DRK from '../assets/img/jobs/DRK.webp';
import GNB from '../assets/img/jobs/GNB.webp';
import MCH from '../assets/img/jobs/MCH.webp';
import MNK from '../assets/img/jobs/MNK.webp';
import NIN from '../assets/img/jobs/NIN.webp';
import PLD from '../assets/img/jobs/PLD.webp';
import RDM from '../assets/img/jobs/RDM.webp';
import SAM from '../assets/img/jobs/SAM.webp';
import SCH from '../assets/img/jobs/SCH.webp';
import SMN from '../assets/img/jobs/SMN.webp';
import WAR from '../assets/img/jobs/WAR.webp';
import WHM from '../assets/img/jobs/WHM.webp';

import TANK from '../assets/img/jobs/TANK.png';
import HEALER from '../assets/img/jobs/HEALER.png';
import MELEE from '../assets/img/jobs/MELEE.png';
import RANGED from '../assets/img/jobs/RANGED.png';
import MAGIC from '../assets/img/jobs/MAGIC.png';

export const JOBS = {
    PLD: { name: "PLD", icon: PLD },
    WAR: { name: "WAR", icon: WAR },
    DRK: { name: "DRK", icon: DRK },
    GNB: { name: "GNB", icon: GNB },

    WHM: { name: "WHM", icon: WHM },
    SCH: { name: "SCH", icon: SCH },
    AST: { name: "AST", icon: AST },

    DRG: { name: "DRG", icon: DRG },
    MNK: { name: "MNK", icon: MNK },
    NIN: { name: "NIN", icon: NIN },
    SAM: { name: "SAM", icon: SAM },

    BRD: { name: "BRD", icon: BRD },
    MCH: { name: "MCH", icon: MCH },
    DNC: { name: "DNC", icon: DNC },

    BLM: { name: "BLM", icon: BLM },
    SMN: { name: "SMN", icon: SMN },
    RDM: { name: "RDM", icon: RDM }
}

export const ROLES = {
    TANK: {
        icon: TANK,
        jobs: { PLD: JOBS.PLD, WAR: JOBS.WAR, DRK: JOBS.DRK, GNB: JOBS.GNB }
    },
    HEALER: {
        icon: HEALER,
        jobs: { WHM: JOBS.WHM, SCH: JOBS.SCH, AST: JOBS.AST }
    },
    MELEE: {
        icon: MELEE,
        jobs: { DRG: JOBS.DRG, MNK: JOBS.MNK, NIN: JOBS.NIN, SAM: JOBS.SAM }
    },
    RANGED: {
        icon: RANGED,
        jobs: { BRD: JOBS.BRD, MCH: JOBS.MCH, DNC: JOBS.DNC }
    },
    MAGIC: {
        icon: MAGIC,
        jobs: { BLM: JOBS.BLM, SMN: JOBS.SMN, RDM: JOBS.RDM }
    }
}

export const displayConfirmedSignups = (amount) => {
    if (amount < 8) {
        return <div className="text-warning"> <AiFillWarning style={{verticalAlign: 'sub'}} size="20" /> {amount} </div>
    }

    if (amount === 8) {
        return <div className="text-success"> <AiFillCheckCircle style={{verticalAlign: 'sub'}} size="20" /> {amount} </div>
    }

    return <div className="text-danger"> <AiFillCloseCircle style={{verticalAlign: 'sub'}} size="20" /> {amount} </div>
}

export const compareSignups = (a, b) => {
    const one = DateTime.fromISO(a).toMillis();
    const two = DateTime.fromISO(b).toMillis();

    if (one > two) return 1;
    else if (one === two) return 0;
    else return -1;
}

export const getJobIcon = (job, width = 25) => {
    return <img src={JOBS[job].icon} alt="job-icon" width={width} />;
}

export const countRoles = (jobs) => {
    let counts = { tank: 0, healer: 0, melee: 0, ranged: 0, magic: 0 };

    jobs.forEach(item => {
        if (Object.keys(ROLES.TANK.jobs).includes(item)) counts['tank'] = counts['tank'] + 1;
        else if (Object.keys(ROLES.HEALER.jobs).includes(item)) counts['healer'] = counts['healer'] + 1;
        else if (Object.keys(ROLES.MELEE.jobs).includes(item)) counts['melee'] = counts['melee'] + 1;
        else if (Object.keys(ROLES.RANGED.jobs).includes(item)) counts['ranged'] = counts['ranged'] + 1;
        else if (Object.keys(ROLES.MAGIC.jobs).includes(item)) counts['magic'] = counts['magic'] + 1;
    });

    return counts;
}