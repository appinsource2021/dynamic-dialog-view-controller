import * as React from 'react';
import { Component } from 'react';
import { dialogActionView } from './AISDialogActionViewController';
import { Theme } from "@mui/material";
import { SxProps } from '@mui/system';
type TypeStateListener = <T>(state: State, dialog: _dialogComponent) => void;
type DialogShowCallbackArgs = (dialog: _dialogComponent) => void;
type DialogCloseCallbackArgs = (dialog: _dialogComponent) => void;
type DialogContentCallbackArgs = (dialog: _dialogComponent) => any;
type DialogMaxSizeType = "xs" | "sm" | "md" | "lg" | "xl";
type ComponentAxisType = {
    getAxis: <T>() => number;
};
interface Props {
    content?: DialogContentCallbackArgs;
    title?: DialogContentCallbackArgs;
    actions: Array<dialogActionView>;
    closeable: boolean;
    maxWidth: DialogMaxSizeType;
    maxHeight: number;
    parent: AISDialogViewController;
    contentProps: SxProps<Theme>;
    didMountCallback: DialogShowCallbackArgs;
    draggable?: boolean;
    children?: DialogContentCallbackArgs;
    reference: AISDialogViewController;
    /**
     * Bring the dialog in front of the specified component.
     * */
    bringToFrontComponent: ComponentAxisType;
    /**
     * Sends the dialog behind the specified component
     * */
    sendToBackComponent: ComponentAxisType;
    stateListener: <T>(state: State, dialog: _dialogComponent) => void;
}
interface State {
}
declare class _dialogComponent extends Component<Props, State> {
    getAxis(): number;
    setAxis(value: number): void;
    get formikProps(): object;
    set formikProps(value: object);
    _title: DialogContentCallbackArgs;
    _content: DialogContentCallbackArgs;
    _contentProps: SxProps<Theme>;
    _actions: Array<dialogActionView>;
    _closeable: boolean;
    _maxWidth: DialogMaxSizeType;
    _parent: AISDialogViewController;
    _draggable: boolean;
    _children: any;
    _reference: AISDialogViewController;
    _open: boolean;
    _closeCallbackFn: DialogCloseCallbackArgs;
    _stateListener: <T>(state: State, dialog: _dialogComponent) => void;
    _axis: number;
    _formikProps: object;
    _dialogRef: React.RefObject<HTMLDivElement>;
    constructor(props: Props);
    setState(state: ((prevState: Readonly<State>, props: Readonly<Props>) => State | null) | State | null, callback?: () => void): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void;
    setAction(action: dialogActionView): this;
    setTitle(content: DialogContentCallbackArgs): this;
    setContent(content: DialogContentCallbackArgs, props?: SxProps<Theme>): this;
    setDraggable(draggable: boolean): this;
    setCloseable(closeable: boolean): this;
    setMaxWidth(width: DialogMaxSizeType): this;
    close(callbackFn?: DialogCloseCallbackArgs): void;
    /**
     * Bring the dialog in front of the specified component.
     * */
    bringToFront(component: ComponentAxisType): _dialogComponent;
    /**
     * Sends the dialog behind the specified component
     * */
    sendToBack(component: ComponentAxisType): _dialogComponent;
    render(): React.JSX.Element;
}
declare class AISDialogViewController {
    _title: DialogContentCallbackArgs;
    _content: any;
    _actions: Array<dialogActionView>;
    _closeable: boolean;
    _maxWidth: DialogMaxSizeType;
    _maxHeight: number;
    _contentProps: SxProps<Theme>;
    _component: _dialogComponent;
    _body: object;
    _draggable: boolean;
    _reference: AISDialogViewController;
    _stateListener: <T>(state: State, dialog: _dialogComponent) => void;
    _bringToFrontComponent: ComponentAxisType;
    _sendToBackComponent: ComponentAxisType;
    constructor();
    setTitle(content: DialogContentCallbackArgs): this;
    setHeader(content: DialogContentCallbackArgs): this;
    setContent(content: DialogContentCallbackArgs, props?: SxProps<Theme>): this;
    setActions(actions: Array<dialogActionView>): this;
    setAction(action: dialogActionView): this;
    setDraggable(draggable: boolean): this;
    setCloseable(closeable: boolean): this;
    setMaxWidth(width: DialogMaxSizeType): this;
    stateListener(callbackFn: TypeStateListener): AISDialogViewController;
    /**
     * Bring the dialog in front of the specified component.
     * */
    bringToFront(component: ComponentAxisType): AISDialogViewController;
    /**
     * Sends the dialog behind the specified component
     * */
    sendToBack(component: ComponentAxisType): AISDialogViewController;
    show(callbackFn?: DialogShowCallbackArgs): void;
}
export default AISDialogViewController;
export { _dialogComponent };
