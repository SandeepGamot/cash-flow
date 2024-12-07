import { ValueTransformer } from "typeorm";
import { denormalise, normalise } from "../../utils/methods";

export class OptionTransformer implements ValueTransformer {
  to(option: string): string {
    return normalise(option);
  }

  from(normalised: string): string {
    return denormalise(normalised);
  }
}
