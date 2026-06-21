export interface AgentNode {
  id: string;
  label: string;
  shortExplanation: string;
  longExplanation: string;
  exampleAction: string;
  colorClass: string;
}

export interface WizardQuestion {
  id: string;
  text: string;
  options: {
    label: string;
    description: string;
    value: string;
    icon: string;
  }[];
}
