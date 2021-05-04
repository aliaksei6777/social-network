import React, {ChangeEvent} from "react";


type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

class ProfileStatus extends React.Component<PropsType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        if (this.state.status) {
            this.props.updateStatus(this.state.status)
        }
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps : Readonly<PropsType>, prevState : Readonly<{}>, snapshot? : any) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "no-status"}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onBlur={this.deactivateEditMode}
                               value={this.state.status}
                               autoFocus
                               onChange={this.onStatusChange}

                        />
                    </div>
                }
            </div>
        )
    }
}




export default ProfileStatus;