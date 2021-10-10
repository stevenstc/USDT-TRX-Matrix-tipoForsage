import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FormGroup, Row, InputGroup, InputGroupAddon, Input, InputGroupText ,Table,  
      Button} from 'reactstrap';
import Widget from '../../components/Widget';
import s from './Sidebar.module.scss';

class Sidebar extends React.Component {
    static propTypes = {
        sidebarStatic: PropTypes.bool,
        sidebarOpened: PropTypes.bool,
        dispatch: PropTypes.func.isRequired,
        activeItem: PropTypes.string,
        location: PropTypes.shape({
            pathname: PropTypes.string,
        }).isRequired,
    };

    static defaultProps = {
        sidebarStatic: false,
        activeItem: '',
    };

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.element.addEventListener('transitionend', () => {
            if (this.props.sidebarOpened) {
                this.element.classList.add(s.sidebarOpen);
            }
        }, false);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sidebarOpened !== this.props.sidebarOpened) {
            if (nextProps.sidebarOpened) {
                this.element.style.height = `${this.element.scrollHeight}px`;
            } else {
                this.element.classList.remove(s.sidebarOpen);
                setTimeout(() => {
                    this.element.style.height = '';
                }, 0);
            }
        }
    }


    render() {
        return (
            <nav
                className={classnames(s.root)}
                ref={(nav) => {
                    this.element = nav;
                }}
            >
                <main className={s.content}>
                <Row>
                <Table>              
                <tbody>
                <tr>
                       <td>
                           <p style={{fontSize: 18}}>My id</p>
                           <p style={{fontSize: 18}}>Upline id</p>
                           <p style={{fontSize: 18}}>Wallet</p>
                       </td>
                       <td style={{textAlign: "right"}}>
                           <p style={{fontWeight: "bold",fontSize: 16}}>{"12"}</p>
                           <p>{"1"} <i className="fa fa-comment text-white"/></p>
                           <p style={{textAlign: "right",fontSize: 16}}>{"1e356n5y5hh"} <CopyToClipboard text={"My wallet"}><i className="fa fa-clipboard text-white"/></CopyToClipboard></p>
                       </td>
                     </tr>
                <tr>
                       <td style={{fontSize:18,textAlign: "left"}}>My partners</td>
                       <td>
                       <p style={{fontSize:18,textAlign: "right"}}>{"11"}</p>
                 </td>
                     </tr>
                  <tr>
                    <td style={{fontSize:18,textAlign: "left"}}>l earned</td>
                       <td style={{textAlign: "right"}}>
                        <p style={{fontSize:28}}>${"23232"}</p>
                        <small><small>{"23423432"} TRX</small></small>
                        </td>
                     </tr>
                     <tr>  
                     <td></td>
                       <td>  </td>                    
                     </tr>
                </tbody>
              </Table>
            </Row>
            <Row>
            </Row>
            <Row>
            </Row>
            <Row>
                <Widget title={<div className="mt-0" style={{padding:10}}>My affiliate link</div>} >
                    <form>                            
                        <FormGroup className="mt">
                            <InputGroup className="input-group">
                                <Input id="link" className="input-transparent pl-3" type="text"
                                        required name="link" placeholder="Link"/>                                           
                                <InputGroupAddon addonType="prepend" className="bg-transparent">
                                    <InputGroupText>
                                        <CopyToClipboard text={"My link"}><i className="fa fa-clipboard text-white"/></CopyToClipboard>
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="mt">
                            <Button type="submit" color="success" className="auth-btn"
                                    size="sm" style={{color: '#fff',width:'100%'}}>
                                {'Invite to Forsage'}
                            </Button>
                        </FormGroup>
                        <FormGroup className="mt">
                            <Button type="submit" color="success" className="auth-btn"
                                    size="sm" style={{color: '#fff',width:'100%'}}>
                                {'Telegram tools'}
                            </Button>
                        </FormGroup>
                    </form>
                </Widget>  
            </Row>
            </main>                
            </nav>
        );
    }
}

function mapStateToProps(store) {
    return {
        sidebarOpened: store.navigation.sidebarOpened,
        sidebarStatic: store.navigation.sidebarStatic,
        alertsList: store.alerts.alertsList,
        activeItem: store.navigation.activeItem,
    };
}

export default Sidebar;
