import React,{Fragment, Component} from 'react';
import Modal from '../../UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }

        componentWillMount(){
            this.reqIntc = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            });

            this.resIntc = axios.interceptors.request.use(res => {
                this.setState({error: null})
                return res
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqIntc)
            axios.interceptors.response.eject(this.resIntc)
        }

        errorConfirmHandler = () => {
            this.setState({error: null})
        }
        

        render(){
            return(
                <Fragment>
                    <Modal show={this.state.error} closeModal={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    } 
}

export default withErrorHandler;