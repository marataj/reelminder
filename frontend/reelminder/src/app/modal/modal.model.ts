export type BodyIcone = 'created' | 'question' | 'info' | 'stop' | 'check';
export type ButtonIcone = 'play' | 'openGroup' | 'delete' | 'confirm';

export interface ModalModel {
  title: string;
  body?: string;
  timeout_ms?: number;
  confirm_text?: string;
  body_icone?: string;
  button_icone?: string;
}
