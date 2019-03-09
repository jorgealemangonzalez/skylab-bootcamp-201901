import React, { Component} from 'react'

import moment from 'moment';
import logic from '../../logic';
import Appointments from '../Appointments';
import './index.sass'

class Calendar extends Component {

    state = { users: [], owner: '', pets: [], pet: '', hour: '', visitConfirmed: false, year: moment().format('YYYY'), month: moment().format('MM'), day: moment().format('DD'), error: null}

    // handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })
    
    componentDidMount() {
        this.retrieveUsers()
        // this.retrieveAppointments()
      }
  
      retrieveUsers = async () => {
          const users = await logic.retrieveUsers()
          this.setState({ users })
        }
        
      // retrieveAppointments = async () => {
      //   const appointments = await logic.retrieveAppointments()
      //   this.setState({ appointments })
      // }
  
    //     handleSelectOwner = async event => {
    //       event.preventDefault()
    //       const usersId = event.target.value
    //       this.retrievePets(usersId)
    //       this.setState({ owner: usersId })
    //       console.log("handleselectowner" + usersId)
    //   }
  
    handleSelectOwner = async event => {
    event.preventDefault()
    const usersId = event.target.value
    this.retrievePets(usersId)
    console.log(usersId)
    this.setState({ owner: usersId })
    }

    retrievePets = async userId => {
    const pets = await logic.retrievePets(userId)
    console.log("calendar userId " + userId)
    this.setState({ pets })
    // debugger)
          // await logic.retrieveAppointments()
    }
  
    handleSelectPet = async event => {
    event.preventDefault()
    const petsId = event.target.value
    console.log("calendar petsID " + petsId)
    this.setState({pet: petsId})
    // const {day,hour} = await logic.retrievePetVisit(petsId)
    // this.setState({day, hour})
    }

    handleGoHome = event => {
    event.preventDefault()
    this.props.history.push('/home')
    }
  
    handleNextMonth = event => {
    event.preventDefault() 
    this.setState({ month: this.state.month +1 });
    
    if(this.state.month === 12){
        this.setState({ year: 2020, month: 1 })
        console.log(this.state.month)
    }
    }
  
    handleLastMont = event => {
    event.preventDefault()
    this.setState({ month: this.state.month - 1 });
    if(this.state.month === 1){
        this.setState({ year: 2018, month: 12 })
        console.log(this.state.month)
        }
      }

    handleSelectHour = event => {
        event.preventDefault()
        const hour = event.target.value;
        this.setState({hour})
        console.log(hour)
    }

    handleDatePicker = event => {
    event.preventDefault()
    const date = event.target.value;
    console.log(date)
        function getDate(date){
            let result = date.split('-');
            return result;
        }
        let splitDate = getDate(date);
        let yearVisit = splitDate[0];
        let monthVisit = splitDate[1];
        let dayVisit = splitDate[2];

        let year = yearVisit;
        let month = monthVisit;
        let day = dayVisit;
        this.setState({ year, month, day });
      }

    // confirmVisit = event =>{
    //     event.preventDefault()
    //     this.setState({confirmHour:true})
    // }

    // confirmVisitNO = event =>{
    //     event.preventDefault()
    //     this.setState({confirmHour:false})
    // }

    confirmVisit = event => {
        event.preventDefault()
        const {state: {owner, pet, year, month, day, hour}} = this
        this.assignVisit(owner, pet, year, month, day, hour)
    }

    assignVisit = async (owner, pet, year, month, day, hour) => {
        try {
            await logic.assignAppointment(owner, pet, year, month, day, hour)
            this.setState({visitConfirmed: true, error: false})
        }catch ({message}) {
            this.setState({error:message})
        }
    }

    render() {
        const { state: { year, month } } = this

        const m = moment(`${year}-${month}`)
        return <section>
            <div className="input__form">
                  <label>Select Owner</label>
                  <select name="owner" onChange={this.handleSelectOwner} required>
                  {<option></option>}{this.state.users.map(user => <option name="owner" value={user.id} required>{user.name}</option>)}
                  </select>
              </div>
              <div className="input__form">
                  <label>Select Pet</label>
                  <select name="pet" onChange={this.handleSelectPet}>
                  {<option></option>}{this.state.pets.map(pet => <option name="pet" value={pet.id}>{pet.name}</option>)}
                  </select>
              </div>
              <div className="input__form">
                  <label>Date</label>
                  <input type="date" defaultValue={`${this.state.year}-${this.state.month}-${this.state.day}`} onChange={this.handleDatePicker}/>
              </div>
              <div className="input__form">
                  <label>Hour</label>
                  <select name="hour" onChange={this.handleSelectHour}>
                    <option>Select an hour:</option>
                    <option name="hour" value="17:00" onChange={this.handleOnChange}>17:00</option>
                    <option name="hour" value="17:30" onChange={this.handleOnChange}>17:30</option>
                    <option name="hour" value="18:00" onChange={this.handleOnChange}>18:00</option>
                    <option name="hour" value="18:30" onChange={this.handleOnChange}>18:30</option>
                    <option name="hour" value="19:00" onChange={this.handleOnChange}>19:00</option>
                    <option name="hour" value="19:30" onChange={this.handleOnChange}>19:30</option>
                </select>
                <button onClick={this.confirmVisit} className="button">Confirm</button>
                {this.state.visitConfirmed && <div><p className="feedback__Ok">Visit successfully assigned!</p></div>}                                  
                {this.state.error && <p className="feedback__Error">{this.state.error}</p>}
                
                  {/* {<option></option>}{this.state.hour.map(appointment => <option name="hour" value={appointment.id}>{appointment.hour}</option>)} */}
                  {/* </select> */}
              </div>

            <h2>{m.format('MMMM')}</h2>
            {
                (() => {
                    const days = []
                    // const year = []
                    const weeks = Math.ceil((m.day() + m.daysInMonth()) / 7)

                    let paint = false
                    let count = 1
                    // let dayweek= 1
                    // let weekday=0

                    for (let w = 0; w < weeks; w++) {
                        for (let d = 0; d < 7; d++) {
                            if (d === m.day()) paint = true; 
                            
                            const mNow = moment(`${year}-${month}-${count}`)

                                // days.push(<div className="month-day" key={count}>{`${year}`}
                                // days.push(<div className="month-day">{`${year}`}
                                // </div>)
                                
                                
                                if (paint && count <= m.daysInMonth()) {
                                    // if(dayweek<7)
                                    // days.push(<div className="day-month" key={count}>{` ${mNow.format('dddd')} ${dayweek++}`}</div>)
                                    // if(weekday<7)
                                    
                                // year.push(`${mNow.format('YYYY')}`)
                                // days.push(<div><table><tr className="month-day" key={count}>{`${mNow.format('dd')}${count++}`}</tr></table></div>
                                days.push(<div><table><tr className="month-day" key={count}>{`${mNow.format('dddd')} ${count++}`}
                                {/* days.push(<div><table><tr className="month-day" key={count}>{`${mNow.format('YYYY')}${count++}`} */}
                                </tr>
                                <tr>
                                    {/* <button name="dayHour" onChange={this.handleOnChange}  onClick={this.confirmVisit}>17:00</button> */}
                                    {/* <button name="hour" value= "17:00" onChange={this.handleOnChange} onClick= {this.confirmVisit}>17:00</button>
                                    {this.state.confirmHour && <div><p className="confirm__visit">Assign this hour to owner?</p>}
                                    <button onClick={this.confirmVisitOK}   className="confirm__hour">Yes</button>
                                    <button onClick={this.confirmVisitNO} className="confirm__hour">No</button>
                                    {this.state.visitConfirmed && <div><p className="confirm__visit">Visit successfully assigned!</p></div>}                                  
                                    </div> */}
                                    <th>17:00</th>
                                </tr>
                                <tr>
                                    <th>17:30</th>
                                </tr>
                                <tr>
                                    <th>18:00</th>
                                </tr>
                                <tr>
                                    <th>18:30</th>
                                </tr>
                                <tr>
                                    <th>19:00</th>
                                </tr>
                                <tr>
                                    <th>19:30</th>
                                </tr>
                                </table>
                                </div>)
                               
                                //days.push(<div className="current-month-day" key={count}>{` ${count++}`}</div>)
                                //days.push(<div className="current-month-day" key={count}>{` ${count++} ${weekday++}`}</div>)
                                // if(weekday>7)
                                
                                // days.push(<div className="current-month-day" key={count}>{` ${count++} ${weekday++}`}</div>)
                            } else
                                days.push(<div className="day" key={`${w}-${d}`}></div>)
                        }
                    }
                    return days
                })()
            }
              </section>      
    } 
  }
export default Calendar