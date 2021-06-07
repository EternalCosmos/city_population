export interface AutocompleteFieldProps {
  data: string[];
  id: string;
  inputValue: string | undefined;
  isOpened: boolean;
  label: string;
  onChange: Function;
  onInput: Function;
  value: string | null;
  focus?: boolean;
}
