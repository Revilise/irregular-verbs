import type {FC} from "react";
import {useBEM} from "@shared/lib";
import type {IChecker} from "../config/types.ts";

export const Checker: FC<IChecker> = ({
    extraCN,
    utilCN,
    id,
    name,
    checked,
    disabled,
    required,
    value,
    type = "checkbox",
    label
}) => {
    const { bem } = useBEM("checker");

    return (
        <label className={bem("", extraCN, utilCN)}>
            <input className={bem("input")} type={type} id={id} name={name} value={value} disabled={disabled} checked={checked} required={required} />
            <span className={bem("label")}>{label}</span>
        </label>
    )
}