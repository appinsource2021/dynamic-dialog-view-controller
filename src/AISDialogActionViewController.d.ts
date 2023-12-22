import * as React from "react";
import { _dialogComponent } from "./AISDialogViewController";
import { Component, RefObject } from "react";
type ButtonVariantType = "contained" | "outlined" | "text";
type ActionColorTypes = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
type ActionCallbackArgs = (button?: DialogBaseAction, dialog?: _dialogComponent) => void;
type StateListenerCallback = (button?: DialogBaseAction | AISDialogActionViewController, dialog?: _dialogComponent) => void;
interface Props {
    onLoad?: Function;
    title: any;
    onClick: Function;
    color?: ActionColorTypes;
    variant?: ButtonVariantType;
    disabled?: boolean;
    dialog: _dialogComponent;
}
interface State {
}
declare class DialogBaseAction extends Component<Props, State> {
    _buttonWrapperRef: RefObject<HTMLButtonElement>;
    _disabled: boolean;
    _inProcess: boolean;
    _label: any;
    _color: ActionColorTypes;
    _variant: ButtonVariantType;
    _action: any;
    _dialog: _dialogComponent;
    constructor(props: any);
    componentDidMount(): void;
    setAction(action: ActionCallbackArgs): this;
    setVariant(variant: ButtonVariantType): this;
    setLabel(label: any): this;
    setColor(color: ActionColorTypes): this;
    setDisabled(disabled: boolean): this;
    setInProcess(value?: boolean): this;
    remove(): void;
    render(): React.JSX.Element;
}
declare class AISDialogActionViewController {
    label: any;
    action: ActionCallbackArgs;
    color: ActionColorTypes;
    component: DialogBaseAction;
    variant: ButtonVariantType;
    disabled: boolean | undefined;
    _stateListener: StateListenerCallback;
    constructor();
    setLabel(label: any): this;
    getLabel(): any;
    setVariant(variant: ButtonVariantType): this;
    getVariant(): ButtonVariantType;
    setColor(color: ActionColorTypes): this;
    getColor(): ActionColorTypes;
    setAction(action: ActionCallbackArgs): this;
    getAction(): ActionCallbackArgs;
    setDisabled(disabled: boolean): this;
    getDisabled(): boolean;
    setInProcess(value: boolean): this;
    remove(): void;
    setComponent(component: DialogBaseAction): this;
    stateListener(listener: StateListenerCallback): this;
}
export { AISDialogActionViewController as dialogActionView };
export { AISDialogActionViewController };
export { DialogBaseAction };
