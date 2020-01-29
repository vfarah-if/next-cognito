import React, { Component } from 'react';
import classNames from 'classnames';
import {
    FormControl, TextField, Button, Typography, Grid, Paper, FormGroup, FormControlLabel, Select
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class SignUpForm extends Component {  
    state = {
        given_name: undefined,
        middle_name: undefined,
        family_name: undefined,
        nickname: undefined,
        email: undefined,
        gender: undefined,
        locale: undefined,
        zoneinfo: undefined,
        password: undefined
    };

    validate = () => {
        const { given_name, family_name, email, password } = this.state;
        if (given_name && family_name && email && password) {
            return true;
        }
        return false;
    }

    handleSubmit = event => {
        event.preventDefault(); 
        if( this.validate()){
            const { onSubmit } = this.props;
            const data = JSON.parse(JSON.stringify(this.state));        
            onSubmit(data);            
        }
    };

    render() {
        const { classes } = this.props;
        
        const handleChange = name => event => {
            this.setState({ [name]: event.target.value });
        };

        return (             
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Paper className={classes.control}>
                        <Grid container>
                            <Grid item>
                                <form className={classes.container} >
                                    <Typography variant="headline" gutterBottom>Register User</Typography>
                                    <FormGroup>                                            
                                        <TextField label="Given Name" className={classes.textField} margin="normal" required onChange={handleChange('given_name')}/>
                                        <TextField label="Middle Name" className={classes.textField} margin="normal" onChange={handleChange('middle_name')}/>
                                        <TextField label="Family Name" className={classes.textField} margin="normal" required onChange={handleChange('family_name')}/>
                                        <TextField label="Nick Name" className={classes.textField} margin="normal" onChange={handleChange('nickname')}/>
                                        <TextField label="Email" className={classes.textField} margin="normal" type="email" required onChange={handleChange('email')}/>
                                        <FormControlLabel
                                            className={classes.formControl}
                                            control={<Select
                                                    native
                                                    value={this.state.gender}
                                                    onChange={handleChange('gender')}
                                                    className={classes.textField}                                                                                    
                                                >
                                                    <option value="">None</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Intersex">Intersex</option>
                                                    <option value="Androgyne">Androgyne</option>
                                                    <option value="Queer">Queer</option>
                                                    <option value="Questioning">Questioning</option>
                                                    <option value="Not applicable">Not applicable</option>
                                                </Select>
                                            }
                                            label="Gender"
                                            labelPlacement="top"
                                        />
                                        <FormControlLabel
                                            className={classes.formControl}
                                            control={<Select
                                                    native
                                                    value={this.state.locale}
                                                    onChange={handleChange('locale')}
                                                    className={classes.textField}                                                                                    
                                                >
                                                    <option value="">None</option>
                                                    <option value="af">Afrikaans</option>
                                                    <option value="sq">Albanian</option>
                                                    <option value="am">Amharic</option>
                                                    <option value="ar-dz">Arabic - Algeria</option>
                                                    <option value="ar-bh">Arabic - Bahrain</option>
                                                    <option value="ar-eg">Arabic - Egypt</option>
                                                    <option value="ar-iq">Arabic - Iraq</option>
                                                    <option value="ar-jo">Arabic - Jordan</option>
                                                    <option value="ar-kw">Arabic - Kuwait</option>
                                                    <option value="ar-lb">Arabic - Lebanon</option>
                                                    <option value="ar-ly">Arabic - Libya</option>
                                                    <option value="ar-ma">Arabic - Morocco</option>
                                                    <option value="ar-om">Arabic - Oman</option>
                                                    <option value="ar-qa">Arabic - Qatar</option>
                                                    <option value="ar-sa">Arabic - Saudi Arabia</option>
                                                    <option value="ar-sy">Arabic - Syria</option>
                                                    <option value="ar-tn">Arabic - Tunisia</option>
                                                    <option value="ar-ae">Arabic - United Arab Emirates</option>
                                                    <option value="ar-ye">Arabic - Yemen</option>
                                                    <option value="hy">Armenian</option>
                                                    <option value="as">Assamese</option>
                                                    <option value="az-az">Azeri - Cyrillic</option>
                                                    <option value="az-az">Azeri - Latin</option>
                                                    <option value="eu">Basque</option>
                                                    <option value="be">Belarusian</option>
                                                    <option value="bn">Bengali - Bangladesh</option>
                                                    <option value="bn">Bengali - India</option>
                                                    <option value="bs">Bosnian</option>
                                                    <option value="bg">Bulgarian</option>
                                                    <option value="my">Burmese</option>
                                                    <option value="ca">Catalan</option>
                                                    <option value="zh-cn">Chinese - China</option>
                                                    <option value="zh-hk">Chinese - Hong Kong SAR</option>
                                                    <option value="zh-mo">Chinese - Macau SAR</option>
                                                    <option value="zh-sg">Chinese - Singapore</option>
                                                    <option value="zh-tw">Chinese - Taiwan</option>
                                                    <option value="hr">Croatian</option>
                                                    <option value="cs">Czech</option>
                                                    <option value="da">Danish</option>
                                                    <option value="Maldivian">Divehi</option>
                                                    <option value="nl-be">Dutch - Belgium</option>
                                                    <option value="nl-nl">Dutch - Netherlands</option>
                                                    <option value="">Edo</option>
                                                    <option value="en-au">English - Australia</option>
                                                    <option value="en-bz">English - Belize</option>
                                                    <option value="en-ca">English - Canada</option>
                                                    <option value="en-cb">English - Caribbean</option>
                                                    <option value="en-gb">English - Great Britain</option>
                                                    <option value="en-in">English - India</option>
                                                    <option value="en-ie">English - Ireland</option>
                                                    <option value="en-jm">English - Jamaica</option>
                                                    <option value="en-nz">English - New Zealand</option>
                                                    <option value="en-ph">English - Philippines</option>
                                                    <option value="en-za">English - Southern Africa</option>
                                                    <option value="en-tt">English - Trinidad</option>
                                                    <option value="en-us">English - United States</option>
                                                    <option value="">English - Zimbabwe</option>
                                                    <option value="et">Estonian</option>
                                                    <option value="mk">FYRO Macedonia</option>
                                                    <option value="fo">Faroese</option>
                                                    <option value="fa">Farsi - Persian</option>
                                                    <option value="">Filipino</option>
                                                    <option value="fi">Finnish</option>
                                                    <option value="fr-be">French - Belgium</option>
                                                    <option value="">French - Cameroon</option>
                                                    <option value="fr-ca">French - Canada</option>
                                                    <option value="">French - Congo</option>
                                                    <option value="">French - Cote d"Ivoire</option>
                                                    <option value="fr-fr">French - France</option>
                                                    <option value="fr-lu">French - Luxembourg</option>
                                                    <option value="">French - Mali</option>
                                                    <option value="">French - Monaco</option>
                                                    <option value="">French - Morocco</option>
                                                    <option value="">French - Senegal</option>
                                                    <option value="fr-ch">French - Switzerland</option>
                                                    <option value="">French - West Indies</option>
                                                    <option value="">Frisian - Netherlands</option>
                                                    <option value="gd-ie">Gaelic - Ireland</option>
                                                    <option value="gd">Gaelic - Scotland</option>
                                                    <option value="">Galician</option>
                                                    <option value="">Georgian</option>
                                                    <option value="de-at">German - Austria</option>
                                                    <option value="de-de">German - Germany</option>
                                                    <option value="de-li">German - Liechtenstein</option>
                                                    <option value="de-lu">German - Luxembourg</option>
                                                    <option value="de-ch">German - Switzerland</option>
                                                    <option value="el">Greek</option>
                                                    <option value="gn">Guarani - Paraguay</option>
                                                    <option value="gu">Gujarati</option>
                                                    <option value="">HID (Human Interface Device)</option>
                                                    <option value="he">Hebrew</option>
                                                    <option value="hi">Hindi</option>
                                                    <option value="hu">Hungarian</option>
                                                    <option value="is">Icelandic</option>
                                                    <option value="">Igbo - Nigeria</option>
                                                    <option value="id">Indonesian</option>
                                                    <option value="it-it">Italian - Italy</option>
                                                    <option value="it-ch">Italian - Switzerland</option>
                                                    <option value="ja">Japanese</option>
                                                    <option value="kn">Kannada</option>
                                                    <option value="ks">Kashmiri</option>
                                                    <option value="kk">Kazakh</option>
                                                    <option value="km">Khmer</option>
                                                    <option value="">Konkani</option>
                                                    <option value="ko">Korean</option>
                                                    <option value="">Kyrgyz - Cyrillic</option>
                                                    <option value="lo">Lao</option>
                                                    <option value="la">Latin</option>
                                                    <option value="lv">Latvian</option>
                                                    <option value="lt">Lithuanian</option>
                                                    <option value="ms-bn">Malay - Brunei</option>
                                                    <option value="ms-my">Malay - Malaysia</option>
                                                    <option value="ml">Malayalam</option>
                                                    <option value="mt">Maltese</option>
                                                    <option value="">Manipuri</option>
                                                    <option value="mi">Maori</option>
                                                    <option value="mr">Marathi</option>
                                                    <option value="mn">Mongolian</option>
                                                    <option value="mn">Mongolian</option>
                                                    <option value="ne">Nepali</option>
                                                    <option value="no-no">Norwegian - Bokml</option>
                                                    <option value="no-no">Norwegian - Nynorsk</option>
                                                    <option value="or">Oriya</option>
                                                    <option value="pl">Polish</option>
                                                    <option value="pt-br">Portuguese - Brazil</option>
                                                    <option value="pt-pt">Portuguese - Portugal</option>
                                                    <option value="pa">Punjabi</option>
                                                    <option value="rm">Raeto-Romance</option>
                                                    <option value="ro-mo">Romanian - Moldova</option>
                                                    <option value="ro">Romanian - Romania</option>
                                                    <option value="ru">Russian</option>
                                                    <option value="ru-mo">Russian - Moldova</option>
                                                    <option value="">Sami Lappish</option>
                                                    <option value="sa">Sanskrit</option>
                                                    <option value="sr-sp">Serbian - Cyrillic</option>
                                                    <option value="sr-sp">Serbian - Latin</option>
                                                    <option value="">Sesotho (Sutu)</option>
                                                    <option value="tn">Setsuana</option>
                                                    <option value="sd">Sindhi</option>
                                                    <option value="si">Sinhala</option>
                                                    <option value="sk">Slovak</option>
                                                    <option value="sl">Slovenian</option>
                                                    <option value="so">Somali</option>
                                                    <option value="sb">Sorbian</option>
                                                    <option value="es-ar">Spanish - Argentina</option>
                                                    <option value="es-bo">Spanish - Bolivia</option>
                                                    <option value="es-cl">Spanish - Chile</option>
                                                    <option value="es-co">Spanish - Colombia</option>
                                                    <option value="es-cr">Spanish - Costa Rica</option>
                                                    <option value="es-do">Spanish - Dominican Republic</option>
                                                    <option value="es-ec">Spanish - Ecuador</option>
                                                    <option value="es-sv">Spanish - El Salvador</option>
                                                    <option value="es-gt">Spanish - Guatemala</option>
                                                    <option value="es-hn">Spanish - Honduras</option>
                                                    <option value="es-mx">Spanish - Mexico</option>
                                                    <option value="es-ni">Spanish - Nicaragua</option>
                                                    <option value="es-pa">Spanish - Panama</option>
                                                    <option value="es-py">Spanish - Paraguay</option>
                                                    <option value="es-pe">Spanish - Peru</option>
                                                    <option value="es-pr">Spanish - Puerto Rico</option>
                                                    <option value="es-es">Spanish - Spain (Traditional)</option>
                                                    <option value="es-uy">Spanish - Uruguay</option>
                                                    <option value="es-ve">Spanish - Venezuela</option>
                                                    <option value="sw">Swahili</option>
                                                    <option value="sv-fi">Swedish - Finland</option>
                                                    <option value="sv-se">Swedish - Sweden</option>
                                                    <option value="">Syriac</option>
                                                    <option value="tg">Tajik</option>
                                                    <option value="ta">Tamil</option>
                                                    <option value="tt">Tatar</option>
                                                    <option value="te">Telugu</option>
                                                    <option value="th">Thai</option>
                                                    <option value="bo">Tibetan</option>
                                                    <option value="ts">Tsonga</option>
                                                    <option value="tr">Turkish</option>
                                                    <option value="tk">Turkmen</option>
                                                    <option value="uk">Ukrainian</option>
                                                    <option value="UTF-8">Unicode</option>
                                                    <option value="ur">Urdu</option>
                                                    <option value="uz-uz">Uzbek - Cyrillic</option>
                                                    <option value="uz-uz">Uzbek - Latin</option>
                                                    <option value="">Venda</option>
                                                    <option value="vi">Vietnamese</option>
                                                    <option value="cy">Welsh</option>
                                                    <option value="xh">Xhosa</option>
                                                    <option value="yi">Yiddish</option>
                                                    <option value="zu">Zulu</option>
                                                </Select>
                                            }
                                            label="Locale"
                                            labelPlacement="top"
                                        />
                                        <FormControlLabel
                                            className={classes.formControl}
                                            control={<Select
                                                    native
                                                    value={this.state.zoneinfo}
                                                    onChange={handleChange('zoneinfo')}
                                                    className={classes.textField}                                                                                    
                                                >
                                                    <option value="">None</option>
                                                    <option value="1">(GMT-12:00) International Date Line West</option>
                                                    <option value="2">(GMT-11:00) Midway Island, Samoa</option>
                                                    <option value="3">(GMT-10:00) Hawaii</option>
                                                    <option value="4">(GMT-09:00) Alaska</option>
                                                    <option value="5">(GMT-08:00) Pacific Time (US & Canada)</option>
                                                    <option value="6">(GMT-08:00) Tijuana, Baja California</option>
                                                    <option value="7">(GMT-07:00) Arizona</option>
                                                    <option value="8">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
                                                    <option value="9">(GMT-07:00) Mountain Time (US & Canada)</option>
                                                    <option value="10">(GMT-06:00) Central America</option>
                                                    <option value="11">(GMT-06:00) Central Time (US & Canada)</option>
                                                    <option value="12">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
                                                    <option value="13">(GMT-06:00) Saskatchewan</option>
                                                    <option value="14">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
                                                    <option value="15">(GMT-05:00) Eastern Time (US & Canada)</option>
                                                    <option value="16">(GMT-05:00) Indiana (East)</option>
                                                    <option value="17">(GMT-04:00) Atlantic Time (Canada)</option>
                                                    <option value="18">(GMT-04:00) Caracas, La Paz</option>
                                                    <option value="19">(GMT-04:00) Manaus</option>
                                                    <option value="20">(GMT-04:00) Santiago</option>
                                                    <option value="21">(GMT-03:30) Newfoundland</option>
                                                    <option value="22">(GMT-03:00) Brasilia</option>
                                                    <option value="23">(GMT-03:00) Buenos Aires, Georgetown</option>
                                                    <option value="24">(GMT-03:00) Greenland</option>
                                                    <option value="25">(GMT-03:00) Montevideo</option>
                                                    <option value="26">(GMT-02:00) Mid-Atlantic</option>
                                                    <option value="27">(GMT-01:00) Cape Verde Is.</option>
                                                    <option value="28">(GMT-01:00) Azores</option>
                                                    <option value="29">(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
                                                    <option value="30">(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
                                                    <option value="31">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                                                    <option value="32">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                                                    <option value="33">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
                                                    <option value="34">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
                                                    <option value="35">(GMT+01:00) West Central Africa</option>
                                                    <option value="36">(GMT+02:00) Amman</option>
                                                    <option value="37">(GMT+02:00) Athens, Bucharest, Istanbul</option>
                                                    <option value="38">(GMT+02:00) Beirut</option>
                                                    <option value="39">(GMT+02:00) Cairo</option>
                                                    <option value="40">(GMT+02:00) Harare, Pretoria</option>
                                                    <option value="41">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
                                                    <option value="42">(GMT+02:00) Jerusalem</option>
                                                    <option value="43">(GMT+02:00) Minsk</option>
                                                    <option value="44">(GMT+02:00) Windhoek</option>
                                                    <option value="45">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
                                                    <option value="46">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
                                                    <option value="47">(GMT+03:00) Nairobi</option>
                                                    <option value="48">(GMT+03:00) Tbilisi</option>
                                                    <option value="49">(GMT+03:30) Tehran</option>
                                                    <option value="50">(GMT+04:00) Abu Dhabi, Muscat</option>
                                                    <option value="51">(GMT+04:00) Baku</option>
                                                    <option value="52">(GMT+04:00) Yerevan</option>
                                                    <option value="53">(GMT+04:30) Kabul</option>
                                                    <option value="54">(GMT+05:00) Yekaterinburg</option>
                                                    <option value="55">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
                                                    <option value="56">(GMT+05:30) Sri Jayawardenapura</option>
                                                    <option value="57">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                                                    <option value="58">(GMT+05:45) Kathmandu</option>
                                                    <option value="59">(GMT+06:00) Almaty, Novosibirsk</option>
                                                    <option value="60">(GMT+06:00) Astana, Dhaka</option>
                                                    <option value="61">(GMT+06:30) Yangon (Rangoon)</option>
                                                    <option value="62">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                                                    <option value="63">(GMT+07:00) Krasnoyarsk</option>
                                                    <option value="64">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
                                                    <option value="65">(GMT+08:00) Kuala Lumpur, Singapore</option>
                                                    <option value="66">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
                                                    <option value="67">(GMT+08:00) Perth</option>
                                                    <option value="68">(GMT+08:00) Taipei</option>
                                                    <option value="69">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                                                    <option value="70">(GMT+09:00) Seoul</option>
                                                    <option value="71">(GMT+09:00) Yakutsk</option>
                                                    <option value="72">(GMT+09:30) Adelaide</option>
                                                    <option value="73">(GMT+09:30) Darwin</option>
                                                    <option value="74">(GMT+10:00) Brisbane</option>
                                                    <option value="75">(GMT+10:00) Canberra, Melbourne, Sydney</option>
                                                    <option value="76">(GMT+10:00) Hobart</option>
                                                    <option value="77">(GMT+10:00) Guam, Port Moresby</option>
                                                    <option value="78">(GMT+10:00) Vladivostok</option>
                                                    <option value="79">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
                                                    <option value="80">(GMT+12:00) Auckland, Wellington</option>
                                                    <option value="81">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
                                                    <option value="82">(GMT+13:00) Nuku'alofa</option>
                                                </Select>
                                            }
                                            label="Zone information"
                                            labelPlacement="top"
                                        />

                                        <TextField label="Password" className={classes.textField} margin="normal" required type="password" onChange={handleChange('password')}/>
                                    </FormGroup>                                      
                                </form>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <Button variant="contained" variant="contained" className={classes.button} onClick={this.handleSubmit} disabled={!this.validate()}>
                                        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />Save
                                    </Button>
                                </FormControl>                                                                                                                                                                                                   
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(SignUpForm);    