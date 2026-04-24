import type { FC } from "react";
import { Button } from "@shared/ui/button";
import type {IChoices} from "@entities/choices/config/typo.ts";

export const Choices: FC<IChoices> = ({
  options,
  disabled,
  onChoose
}) => {
  return (
    <div className="choices" role="group" aria-label="Answer options">
      {options.map((opt) => (
        <Button
          key={opt}
          extraCN={{ isChoice: true }}
          disabled={disabled}
          onClick={() => onChoose(opt)}
          label={opt}
        />
      ))}
    </div>
  );
};

