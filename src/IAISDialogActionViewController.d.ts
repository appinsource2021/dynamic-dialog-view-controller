import {_dialogComponent} from "./AISDialogViewController";
import {DialogBaseAction} from "./AISDialogActionViewController";
type ButtonVariantType = "contained" | "outlined" | "text"
type ActionCallbackArgs = <T>(
    button: DialogBaseAction,
    dialog: _dialogComponent
) => void;
type ActionColorTypes = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
interface IAISDialogActionViewController {
    setVariant(variant: ButtonVariantType): this;
    setLabel(label: any): this;
    setAction(action: ActionCallbackArgs): this;
    getAction(): Function;
    setColor(color: ActionColorTypes): this;
    setDisabled(disabled: boolean): this;
    setInProcess(value: boolean): this;
    remove(): void
}