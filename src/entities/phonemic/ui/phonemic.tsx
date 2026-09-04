import type { FC } from "react";
import type { PhonemicProps } from "../config";

export const Phonemic: FC<PhonemicProps> = ({ verb }) => {
  return (
    <div>
      <p className="prompt-label">Phonemic (BrE IPA)</p>
      <p className="ipa" lang="en">
        {verb.ipa}
      </p>
      <p className="hint">Enter the infinitive without &quot;to&quot;.</p>
    </div>
  );
};
