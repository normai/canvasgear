﻿/*!
 * This script paints animated icons on HTML5 canvases
 *
 * version : 0.2.3 — 20190402°0641
 * license : GNU LGPL v3 or later https://www.gnu.org/licenses/lgpl.html
 * copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
 * note : Minimized with Google Closure Compiler
 */
/**
 * @id : file 20140815°1213
 * @authors ncm
 * @encoding UTF-8-with-BOM
 * @note This shall work with Chrome 32.0, Edge 42 , FF 60, IE 9, Opera 58
 * @note Use canvas class 'skipthis' to skip canvas not to be process by CanvasGear
 * @note Search ✂
 */

'use strict'; // [line 20190329°0843]

/**
 * This namespace constitutes the CanvasGear root namespace
 *
 * See sequences 20190329°0621`
 * @id 20180618°0621 (this is parent)
 */
var Cvgr = {};

/**
 * This namespace holds the individual and possibly external algorithm namespaces
 *
 * @id 20180619°0111 (this is parent)
 */
Cvgr.Algos = Cvgr.Algos || {};

/**
 * This namespace stores CanvasGear constants
 *
 * @id 20140926°0741
 * @ref qna 20160612°0321 'semicolon after function definition'
 */
Cvgr.Const =
{
   /**
    * This constant tells the CanvasGear version number -- unused so far
    *
    * @id 20140926°0931
    */
    versionnumber : '0.2.3'

   /**
    * This constant tells the CanvasGear version timestamp -- unused so far
    *
    * @id 20140926°0932
    */
   , versiontimestamp : '20190402°0641'

   /**
    * This ~constant tells whether to pop up debug messages or not
    *
    * @id 20190311°1523
    * @type Boolean
    */
   , bShow_Debug_Dialogs : false

   // discarded in favour of var 20190402°0633
   // // /**
   // // /**
   // //  * This ~constant holds file fingerplop2.mp3 as base64
   // //  *
   // //  * @id  20190402°0551
   // //  * @note Converted by https://www.base64encode.org/ [ref 20190315°0313]
   // //  * @type String
   // //  */
   // // , sB64_Fingerplop2Mp3 : 'w7/Du8KQbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAAIKABA'
   // //                   + 'QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDCgMKAwoDCgMKAwoDCgMKAwoDCgMKAwoDCgMKAwoDCgMKA'
   // //                   + 'woDCgMKAwoDCgMKAwoDCgMOAw4DDgMOAw4DDgMOAw4DDgMOAw4DDgMOAw4DDgMOAw4DDgMOAw4DD'
   // //                   + 'gMOAw4DDgMOAw7/Dv8O/w7/Dv8O/w7/Dv8O/w7/Dv8O/w7/Dv8O/w7/Dv8O/w7/Dv8O/w7/Dv8O/'
   // //                   + 'w78AAAA5TEFNRTMuOTcgAcKqAAAAACwXAAAUwoAkBcONTgAAwoAAAAgoV8O6VsKoAAAAAAAAAAAA'
   // //                   + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
   // //                   + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
   // //                   + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
   // //                   + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw7/Du8KQbAAAA00Q'
   // //                   + 'w44NYcOgAC3DgRnCosKkwowAEXFZwo3CuWowGRcawq93KMKiAgBSw7wKM0rDjSNcQMKEHMKsdFLC'
   // //                   + 'kTEgFMKHVWHDmDwUwpfCicKBEQUgKgcDwoLCnMK3wpPCssOmdcKoFcKKw4fCkSkRwoPDoMO4Pg/C'
   // //                   + 'ggDCgCBQEwfDgcO3w4EAQBA4JAQgw7g+w6B8HygJwoPDp8Oww4LDj8O8wrggc8KUBAEHawfDn8Og'
   // //                   + 'woTCuD9/wpfDigIfUcOCwoDCh8OUwqgGw4nDpMKAUMKBAQAgAMOAGBsNwpPDqsKIDkHDsHw/w6XD'
   // //                   + 'n8Oyw6HDtH1+J8KoH3/Dv8O5w7/CiB3Dv8KDw6fDv8KCFCwGAwHCgMOUYDAUCQMBAAYTA8KYABnC'
   // //                   + 'rRgcA8KIw6B8V0PDjHA0LsOPAMOPw7BnKsOwPxvDgMOlYcOwKMK4IA4BQH8LQBwCNBkqwr8Gw4cF'
   // //                   + 'RDbDgAQiBkwXw74nEMOHBBofwqgiHgjChMO/w7jDmgQiw4HCqELCmGJCDMKfw7/DpMKAasOCwphc'
   // //                   + 'w6DDsE3CicOQR8KEw47CtsO/w7xQAyhLFgdJWMOVOVDDh8O/w7/DswQZw4vChcOEw5luwrPDqMOV'
   // //                   + 'woDDoHAwHA4HA8KBwoDCoEAAAQEBw4/DsEAgDMKIKsOwNRcBZsKNaMO0RMO4KhXDi35OPiotf8Kp'
   // //                   + 'ISEpw7/DucOjUSJOPMO/w7PCiAhJwo9Gw7/DvsOqe8KhcsO/w7A/YknCkCI2w4ttwrLDq3bClcOb'
   // //                   + 'LcK3VsOqw6hNGS/Dk8O/w7vCkmwKAAPDpmFcw64lYARAwopawqrDhcKIAA5xWT5dwpHCgAjDlsKD'
   // //                   + 'w6lrwpIgAMOFQsOmwp3CosKsWMORJsKkezjDgcO1NVFRw5sTaTTDhMOWwp1dVcOdwrzDqcOEwqTD'
   // //                   + 'pMONdsO3w7DDuy91w67DvcKvwq/Dv8KLbcO9XX/DvHbDqcKGwp/Cs8KTSW9haCMbw7bDj8OdGcK7'
   // //                   + 'wqLCqsKfM8OJwrHDusKJwovDuUZhwrtrf3ctN8K3wrbCusKPw7zDgAcgwoAmUMOxw5jDvl/Dt04/'
   // //                   + 'CcKgAAAADCAcBgVjAVjDomXDmmIzw4gKYBPCuA0fDSfDk8O/bMOfw6/Cn8O/wphBFcK/w7/CtS/D'
   // //                   + 'v8O6wpbChy7DusOzwrE/w69yTMOrf8O/w7/DrEdwRGlXMcKhwqrDgCRoBMO4wqkbZsOywrkswqXC'
   // //                   + 'vMKcR3MIdF40woU8GR4BYV5aQhZCwqDChMKMwpvCnBUKC8KnPMKYcsKWAjUEDcO0w4QRwqXChsKO'
   // //                   + 'w7YxBWc8MjJlLXPDmsOTacKCw6LDs8Kew4BLZ3/DjsKUw43Dn1pUwojDiMOsw6FCU0vCsTV1w48U'
   // //                   + 'FCHDtMOTDChTGG09w7ctekHDvBpTwocdw752TsKgNABEwoVpwqdrL2rCtkrDjMOhwrFAwpTClcOM'
   // //                   + 'w5nDr1PDv8OIHxE4w4rDlcOUU8O1w71EwoHCryQZw7/DvG/Cr8O2D2gkTH7Dt8KpwoTClgLCscOV'
   // //                   + 'M8KUey3CncKvTT4wwrpHwq3ClSHDiFXDhcKiQRLCtzoSwptED0YWfsKsw6LCkCJhwoHDuMKOHsKM'
   // //                   + 'woRrwpnDhMO/w7vCkmwVwoADw4pBTcKFYQACTsOMWjzCpAgBDw1BOTk2woABLcKaw6vCtwTCgAJ0'
   // //                   + 'Hi4jwo4YLEsQw44cwprCtMOkGjMaS8OKw6vCmsKdwrQiwrV9acO2w57Cq8OMwroOWDDDqBnDml00'
   // //                   + 'LcKlwqDDssOHVTbDgz7Dh8OiKjLDmjgJwqYewozDnwDDtV3Djmx7wqXDt33CvkAuN8KtwrrCrEzD'
   // //                   + 'tUElAMKbwqByDcKxdVxrJsKHIsOBClxCLMOJM8Kpw4jCr8O/w7/Dvh0Xw4kyWMOlw4jDt1JkJnbD'
   // //                   + 'vsK0w7fCusORHsOIwojDncOtZ8OtecO6USZOw5koe2dLwr7CqXXCm1bCshLCiX7CjsKWwpnCri3D'
   // //                   + 'ngrDrRYAADBDw4AgQUgAAMOREBYvY1RzBsKodFgdwpLDgMOcQn7DgcK0PUkiwpZ0woJcRWXDnsOl'
   // //                   + 'wofDhylAwpE8bcOmwqgUTcKHwqJJLsKPw4oIEsOnw4omRxFjKl/Col9Iw4XDjMKKw5NJKsObw7zC'
   // //                   + 'pMK0wovDpsKHwo1Nw4rDlsKkwpbCj1fDvMKUJEnCpigaw4ooJsK9fsK0f8O+dcOEQEZEZRt6w47C'
   // //                   + 'qMKTP8OLAk3ChsKBQ2EgwrhaLRbCi0XCgAAxw4pcEMKKYmZ8G8KKwoAwW8OSaXXDvsOJwpQwVQXC'
   // //                   + 'v8OGKcKFwpENw6vDv8K9KXfDgsO/w7/DuMOfwonCnmPDtsK/w7/Dh8KpFMOwKnjDgMOodCQlw7TC'
   // //                   + 'gy4YPMKOVQAzw6gBQsKpMMKmw5QwEMKjCgImAWVLw5xjw6lRSSwIwoNEw4nCisO/w7vCkmwOwo/D'
   // //                   + 'sxEwI8K3DSACL8KjRHHDoMKIAEAAAcKkAAAAIAAANMKAAAAEUW/Dv8O5SMKwJBpsKgjCksKkFhTC'
   // //                   + 'ksKhw4XCkTTCqSzDhSLCmCzCicKrVRImwrVUMcKkWSl4w4Y+wqLCrHJIworCg3/Dv8OCGgpIJcOf'
   // //                   + 'w7rCimhRw4DDg3puWR0Vw5TCisOhw5jCkAYQw4QhTEIUIUQmw79SwpZjGUpvw67CgcKMw6UBLCBX'
   // //                   + 'QmzDkF4Nw6hRw4DCrB3Dv8O/FMOQwqfCi8O/w7/DiMOowq7CpUxBTUUzLjk3VVVVVVVVVVVVVVVV'
   // //                   + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
   // //                   + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
   // //                   + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
   // //                   + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
   // //                   + 'VVVVVVVVVVVVVVVVVVVVVVU='

   // discarded in favour of var 20190402°0635
   // // /**
   // //  * This ~constant holds file fingerplop.mp3 as base64
   // //  *
   // //  * @id 20190402°0553
   // //  * @type String
   // //  */
   // // , sB64_FingerplopMp3 : 'w7/Du8KQbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAIAAAOwrAA'
   // //                   + 'ICAgICAgICAgICAgQEBAQEBAQEBAQEBAYGBgYGBgYGBgYGBgYMKAwoDCgMKAwoDCgMKAwoDCgMKA'
   // //                   + 'woDCgMKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgw4DDgMOAw4DDgMOAw4DDgMOAw4DDgMOAw6DD'
   // //                   + 'oMOgw6DDoMOgw6DDoMOgw6DDoMOgw6DDv8O/w7/Dv8O/w7/Dv8O/w7/Dv8O/w78AAAA5TEFNRTMu'
   // //                   + 'OTcgAcKqAAAAAC4XAAAUwoAkBWVOAADCgAAADsKwBDDCmF8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
   // //                   + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
   // //                   + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
   // //                   + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
   // //                   + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDv8O7wpBsAAADMhrDjQ1pw6AALUFJwqrC'
   // //                   + 'pMKIARHDgQd/wrnDusKwGR3CkMOywrc3KMKCAMKMOHMODRHDgsOCwo0DY8KRUMOtVDgFDGtzw7HD'
   // //                   + 'uMO6WjbDgwVHwpnDlCZ8wqg4wpvCpMKKwoARwoBGAnjCmcKZc8KwHMKGwoDDtcKTwrUcJMOiGMKG'
   // //                   + 'MkNDEMOFAsKxw6PDiMKZfsKGKBXCkTV3w7HDg8OfB8OBw7PDojPDpQ5/EAIQQcOTw79/LwQOQxLD'
   // //                   + 'v8KXB8OAAAIlaFIDw5zDp8OUQMOkYMKAYcKLRsKNHMOoOMKzw6UlJMO6wo5KO8OxAAw/w4EPw7zC'
   // //                   + 'oGHDlcKfw4TDp8O/w7rDgcO8woYDAcKAw4BwOxbCiAMBAAAwPwIlMVjDicOEw5/Dv8KYwpgGIsKc'
   // //                   + 'w5jDhgdKw54Yw4teMMK0AMKoMMKUQVLDr8O3w4DDkmzCoDRYw6vDgMO5bcOQMcK7wpgNAh7DvA0Q'
   // //                   + 'w7UDAgZAw4dAIDPDocOHw7wOOhADw6M4woDDhgDDgBYIwoYhwqLDn8OCw4gAw4DCgMOQGBPCgQAQ'
   // //                   + 'NAoII8Ofw7zCpk8IAEAEJjo1f8O/KMKQw7HClCZIw4QIw6Mzw7/Dv8O5FinCrMOGEwHCjAYDwoHC'
   // //                   + 'gMOgYDAUCADDoAAAFRAywoHCv8O/w7PDocK9NRo7wrfDv8OABAYiLcO/w74Dw6A2w78Twqhfw5AI'
   // //                   + 'b8OGXE7Dg8OswrvDviXCpMOxwrlww4PDv3RPwp1Ew7/DqBrCoD/Dv1zCjE4RFsKBMcOMd29Tw4Ue'
   // //                   + 'wrTDpkUwwqDDo8KJPMOrOcO/w7vCkmwKCBN3TsOTH2jDgAIqQMOqLMOsCAEQPTU0w43CsQvDiMKx'
   // //                   + 'wpFodCwIZTFAw4tCwp0xSMK0wrdlwqMtw5tWwonDlcKiQlrCtcOpfmczO1dKwrzDo0zCtW81AlLD'
   // //                   + 'm8K+ccKZw701bMOMw7nDhiVzOcOmWsK5wqjCscK4S2ZzwrTDusKnwprDn1vDplrCtMOdNw7CrzLD'
   // //                   + 'k8KVw7tsw4/CnMO1wrMtMsOEwpLCqQfDv8O9Kw3CihhpAAAAFAA6exLDuBrDjEoGYEpeFcKRwqUp'
   // //                   + 'wqs7w4DCoCtPwrMtwpFUSsOvw7/Dv8O/w7/Dv8O/w7/DmsKlCXpHwoDDiWREw6l8w7vCqMKZwoIE'
   // //                   + 'EsKCFcKBwokqwprDmnHDscKAI8OwNQ7CjkHDtMOVwoLCq8OePcO4bMOiw4suw6MYXMKGwqvDu8Kz'
   // //                   + 'w6B5w6jDuUISc2zCjsKLKGjCucKoXMKmw4Mhwp7DoVnDucK+ecKbTcKSbQvCm8Omw6nDvMKLSnTC'
   // //                   + 'l8O1RXrCp0tHZBchXcOaYsKDwrFgUCUPBcOgw5PDkGvCoMKwwog1RsOoSxA8K8KCIcOowr3DjGXD'
   // //                   + 'lsO/fsKdw7sAACQRMcKdJhd0FMKuw6xUZEsyXyHCt2BYA8O6RXvCpUvDv8OUw4FQKQUowqPCqzdb'
   // //                   + 'w54nCsOLwpvCojXCjcKyworCqMKLFsKkw6k6bwLCmQFGDgzDrADDnmTDq8OmNAbDgcKgGXsFwoIi'
   // //                   + 'w6/DqmEgScOLwpRaPcKqSiVwwrnDgsOhwrTDhMKbw4zCuSNIa8KuTsOewot0UsOGw5/Dn8OXSMKN'
   // //                   + 'bMO9w6zDsnXCjF7Dv8O7wpJsJQwDwq1PThs6MiAvYUnDig8DJRDCvRMmTcOww4jCiQHChGh0F8KI'
   // //                   + 'w4TDjsOnw63DvUlwwpnCrV8pwq5KwrROLjNVU8Kbwp3CrntswrJYdsKzwrXDjDN5w4zCnsKOw6TC'
   // //                   + 'ssOnwoTCgsOjRzvDv3AABgoAAAAJEsKMDcKiw6nDrMKmQFfCl8OBw5fCg8KJwr0LRGpKw6XCgWBo'
   // //                   + 'Hg7CnA8dw7/Dv8O/w7/Dv8O/w5otwr3CosKyKFFKQ8KrHTIQwoFgBBouE8OoGCBnYyZlGGoQwqd6'
   // //                   + 'NcKTEgPChMONwqvDnsO6SDjDpHLCjwkgAjU8JCUCwpDCl2LCkUzCgm7DtsKkEznCqSbDjyxhw7Q2'
   // //                   + 'dcO2EzYXw6MLwos0wqzDpcOvw4RxwoHCp1vDvW/CuDdNwoHDuSLDoMKrwqZzN8Orw4/DoMKOwppZ'
   // //                   + 'wo8XTmQYWm9BR8OADiwGwrbDhsOKwqrCucKDw4w+BcK7w6s5w67DvsOlwrtZw47DvsKwGQANwobC'
   // //                   + 'ulkjYcOIIUYUwpjCssKHJwAGDQPCr8OWCTw2Az0oGkPDuMKqEgtFAFcpwofCjkokecKTIsKNEgTD'
   // //                   + 'oQTDkixscSTDtMOUbcK2w7xOw4fCnMO6VSzCjEbDmMOCwoNawpDDsMKqwovCmGA4JBTCqCg6wpAX'
   // //                   + 'RjVCwpFgVlDDqk4ARMKNIBzCtsKNBCjDtcKUfQ8swo7DhCfDkcKvwpVaCQXCmMOtSjjCpU/CizbC'
   // //                   + 'm351w7zCjUXCs8K5UcKNQlYWMmYhMMKzw4YxYsKXWDJmbMOpIsKeSXfDv8O7wpJsLgwEGGZIwotm'
   // //                   + 'G3JBQcO5w4wsI2UPUcKRIC4YbQlIwpbDp8K0IwwtMMOuEMOLKcOWw5rCkMKlYMKRYRvCnUJ1PcKN'
   // //                   + 'w4rCm8KDQT/ClcOuw7MpOzV6wp1Of8Onwo4hwqXCgsKaAAAUTsOZSsOBOcKxE8K8RybCgsKAw5or'
   // //                   + 'eMOQNwt1QsKAwo8sworChMOmwpHDtw/DnzzChcK8w6xmw53Cj8KKFHHCl8KLwoYaw6LDtVbCksKl'
   // //                   + 'LlFWwqVBwrAsIsK1BcKXIQdEA8KPCkPCg8OJwqLDixLCpcO7AAJMDggGwo7DhcKNw6FgKHBYwrvC'
   // //                   + 'scO5w5RBwpLCjU0zblgedsOwwo82JgUowrzCmibCiChLIRYrN8KawpjCtsOLw65CVMKQZcOLCXkb'
   // //                   + 'NhBAwpoKFEcrQjYyw4VCLMOtwrHDpzM9w6k3woLDsmBSQ3h5asKlwrnCn0/DoWPDtcOhw4Myw5Yc'
   // //                   + 'w4/CnMOywp/CnWcLcMOhVhPDqWZkOMKAw7rDrTXDksK2w4DCmcOTwrDDsAQCR8OFwovDmirCmkVj'
   // //                   + 'MMOmwrJlwpbDrHDDkHTDtSxZRSZ8EcKHEcK/CUl8w5NDw6xQczBMw44bHwLChcOow5nDicKLw4h9'
   // //                   + 'wqtkZ0N+woJcH1fDk8O/w63DiUN7VsKeMU/CrADCgcKBw7nDgEhAVBnDpsOsw5fCmMKKcgEMNjc4'
   // //                   + 'wpxqw616exEhw7osw51wYFoOw4AwUcKpwrALGsKZwrrCh8KIw6Fjw7LCkVUkwp5tw6bDtGpCQg7D'
   // //                   + 'i1TCjMKvfxBJwpnCncKFZ8KbLlHDv8O7wpJsJMKIA8KZSEjCq1kYUkTDoQnDnQTDghdMw4lLKywM'
   // //                   + 'w5XDgMO9FWZ0JgzDiMKOwpDCk2V0w53DscK6TMKIw7bDh8KrWMKYW8OHQsK9L8K4wpzDj8OfRMKf'
   // //                   + 'JEDDnHrCh8K7f8ORw7Nvwo7Dt8KsMVJTAxhjRxzCtjTCkMKzw5psacKgQ8KrwoBVwozCt8K2w7vC'
   // //                   + 'l8O+F8ObdsKBMzHDnMKXYCjDs0cOWiDDoiPClsOTG8KMw73Du8KswrbCnsODwqM3wqfDsz/Dvzcb'
   // //                   + 'w5/DsMK9P8Ocw57Cu8OuwrfDr8K8KSfDmSASMWDDhsOhw4kNHsKmB0F8IsKxwovDv8K6w5zCtVvC'
   // //                   + 'tjPDllvDj8Kfw5/DvFASG8KlCkXCnhzDtyJFdjTCrsO+THHCj8Kfw6RTw6cic8KvEMK3KMOvwovD'
   // //                   + 'mileS8OYfUXCjWs2WUjCucO5DsK8w5FQJMKQw6I9KyMIwrbDucKGwo1mTcKNCDpnFsK4w6vDv8O7'
   // //                   + 'QiADZXI6w6IIHcOLPi4SAMOPJkFMwqjDksOcwozCpmQtTsOeEFd7PMKIwojDoR/CsxzDr8K2w7le'
   // //                   + 'GRxKT8OEwqDCgMKlw5bDoDjCqkjDncOJw5o6w6/Dv8Oqw6zCusKaAAbDmMK6wqUDwqQHwrTDhsOV'
   // //                   + 'wrAVTERKFsO4HMKHTDrCh8KrFcOFw4rDhH/DpsOnEx/CqEVmwoPCk8OJwpU9wrrDhyvCq8KhH3vC'
   // //                   + 'lBQEMhsUAsKSUcKlPH4GWsODAwfChcKQRlHDjMOARAHCogMFwp7DiRHCoDAyDMKpeUzDo8K7dMKO'
   // //                   + 'w5LCm0TDh2zDv8KlQS59w5TCg8OidnHDv8O7wpJsNMKAAsOXKcOKw4oPGEBDw6DCujwIIxPDihR7'
   // //                   + 'McKmPGZIw77Ch8Kpw7QAwow/A8KDw4Qtw4BMTkhjwqhjG2sKwprCt8O7w6pXwo3DvcO4w4nDl8OD'
   // //                   + 'aBbDgMOpby/DmsK3TcK/GsOibMO7wr56HcOvOsKRw50SwrfCu8O/dBwHCAQAccK2w5TCjcK2woAR'
   // //                   + 'NULClz/DqMO5FE3Ct8KCEDHCkcOrwpIbbQp7wp88woo8wpXCoFpOw6RYacKGCQAow6jClcKPw7xu'
   // //                   + 'w63CoCbDgcOuwr/DnWdtXMOBwromwqZQfsOcCMKLw7hUw6rCvsOMw5Ffb3fCuWrCrcKDIkjDhMKz'
   // //                   + 'aSRtIgzDksKGw7vDjcOdHcKZwrLCgyLCj07DvH3CoHnDvMKlByZYw61Twqh4bD56w7TClRR6w5LD'
   // //                   + 'u8O9wrdzw5rDrS9WBHfDq8OxwofCrsKlw63Dv8Kfw7/Dv8O/w7wRDghrbDtkwqYqfA3ClRbCpsKL'
   // //                   + 'IMKHwoJIwpHCmyfDuVEUEcKSw79JHMKMw6duaGl0QcKGNDLCnMOvwq3DiSEvSsOPwofDsMK/wrTD'
   // //                   + 'j8KkX8Olw6vDncK5GsKxIsKbOMOgwqrClHEMwo3CslfDtcO/w4TCusO5w70OwrvDj1PDgsOuw70a'
   // //                   + 'w6fCt8Kqw6tjwoI/UMKEw5FbwrbCtsOZI8KMbMKqwq7ChcKCw5zDqHnClcOMw6xqw7VTSMKGYsOG'
   // //                   + 'FcKKw5nDkBxcwrLCpMOPI3wDwoTDmcKRwqQiKcOIw6hJHMKrKhhxAMK9cMOpZRvCijDCoGhBSDZ6'
   // //                   + 'w4ohw7zDvcKLQMKCwoHCmULDsi1Cw5XDpcOGw44lIBcMwpkLwqnDv8O7wpJsXAACw7JCSQsPGFJH'
   // //                   + 'aHnDvRQjw4kLw4RLJMOHwrDDgEkoDsOmdBEZLcOSw7PCpcKOw5LDu8KPVG5KV07Cmn8mw5ohwqLD'
   // //                   + 'scOHwpTDqmjCrkQKEhJwSsOfw7VMVcKHBMKdf8KodirClcKXwqDDkcKew6BZcjfDrzxbw5zDmcK2'
   // //                   + 'aiTDhUUlwovDt8Onw5rCrMK/w73Ds3/DrC3DmsKXHWgmw5wUXWvCihJAwq9pw4xKw7HChyfCvcKM'
   // //                   + 'wpLCuVEGwqtDHMOrw4PCnybCvsO9w4fDuQnDgcO5dG94TCxpw6LDisK1wrBgWCrDi8KLwqbDpz/C'
   // //                   + 'j8OLwo/DvysswpxYw6hcfllxwq/DvxViwrvDqcK9wpYGwokyw5XDgsKfacKuVHbDhMK6VSnCkkrD'
   // //                   + 'pBIgCDDCkWHCgsKNMTRJCS0EwqXCrUTCjS0FwqJzw4JGwpcXwpUxwrMsw7HCs07Dn2XClcKfw5Ud'
   // //                   + 'wpzCqMKOVFvClMOJb8KiOzrCo8KxwpFuw5/Dv8O6f2fDtkVnKcKCwqkcwqjCrMOlW8KyLcO9wp/C'
   // //                   + 'p8O0VU/DqsKKR2MUMCHDjgApwonCqsKdwrZdwp82WcObw7sMwplkcmvCmUhqw5UHAQwIOg4kGRUk'
   // //                   + 'w73CoCFjQVJGwpnDv8O/w7/CoAopTEFNRTMuOTdVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
   // //                   + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVw7/Du8KSbHQP'
   // //                   + 'w7MzaEDCgwYTci3Cg8K4MRgDcgAAAcKkAAAAIAAANMKAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
   // //                   + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
   // //                   + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
   // //                   + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
   // //                   + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
   // //                   + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
   // //                   + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
   // //                   + 'VVVVVVVVVVVVVVVVVVVVVVVVVQ=='

   // discarded in favour of var 20190402°0631
   // // /**
   // //  * This ~constant holds file mouseover.mp3 as base64
   // //  *
   // //  * @id 20190402°0555
   // //  * @type String
   // //  */
   // // , sB64_MouseOver : 'w7/Du1BkAAAAXADDocO1AAAIAAANIMKgAAERfcKnRBh6AAAAADTCgwAAAA4AAA8AAAAALn/DocKB'
   // //                   + 'GB94AwjCvg9AF8OJwqHDjsOxwpYhwqPCm8O4w4rCkMOhw44VwrfDuQ0cw5FawpDDoXN/w6LCtiHC'
   // //                   + 'osOlEMKow6UKw5vDv8OELDHCosKBD8KEY8KDw6IMwo3Dv8O4wq7ChkULQQ/DmC4YG0gHAwMUNAbC'
   // //                   + 'gsO/WsK/w6XCkDB9w4DDkjkDAlgMwpjCgGzDsMK0woYBDMKyOsKFBDrCgMOSWC3CosOfwpDDkDcy'
   // //                   + 'w4kfw7FzEMORwpkgwqUiBE8swrpqwqNkw5bCj8O/w7/Dv8OqacOUwqZKB3d4wpnCh3/CtsOWCcK2'
   // //                   + 'woZGRmQRJsKYEE1Lw7/Du2BkCgjDs8KtRFDDvwbCgAIAAA0gw6AAAQltFynCoMKPwrdAAAA0woAA'
   // //                   + 'AARSw5TCt3Z2dnQWwrUtXcOZwp3CqlrClsKlLsOOw47DjsOoLUtSw5VnZ2dBNBTCtS1LdndnZMOQ'
   // //                   + 'WsKWwrUtw5nDmcOZBMOQTUtSw5JJHcOZaC1qEMKELnQOw5NgAkwjw6cxNibCr8O9QMOCw5VQMsKq'
   // //                   + 'wq/DulnDvcKmwppGKsKqOmjCqsOqwqrCt8OVUALDkcO/w7YIw7/Dv8O/wq/Cn8O4ZcOyw4jDsMOv'
   // //                   + 'w7zDiMO9ZcKpw4MuwoLCl8OBw73Ck8OyO8ObLMO/w7/Du8OZLmTDiy3Cn8O/wrrClcO1RsOqJXnC'
   // //                   + 'gwDCscOLK8OBwpPDgCDCkC7CrA1+G8KUU8Ohw7LDgsOCwq7CucK/w5fCkQAAABfCgcO8wqwhw7/D'
   // //                   + 'v8O9w7zDl8O/w6R4LcKyai3Cvg/DvsKtw7rDu8K5acO/wqfDlcOrw5vDv8O4S8OiwpImw6zCg2DC'
   // //                   + 'gBwwIwrDky1GHTDDv8O7IGQaDMOyL0XDisOoIsO2wrgAAA0gAAABCFkXKmDCi8OcwqAAADTCgAAA'
   // //                   + 'BMOFBlMBQBQswroqMQceKS/Dv8O+w5/Dkj/DusOAF8O/w7/DtcOzX8Ovw6Z0w4nDrBMNYMOBw6vD'
   // //                   + 'qjLDvW1Nw5E/w7XDusOkw6/Dv8O8wqdfwqbCusKmIsKgCBQBw7BIXxjCmjXDocKCWDsYAADCqks3'
   // //                   + 'OMK7w6Uiwp3Dv8O/w7zCnQAAABNvw7/DiCfDv8O/w7tAZATCiMOyXkZKaCLDryAAAA0gAAABCW0b'
   // //                   + 'K8KgwovCnMKAAAA0woAAAATDv8O9w77Cl0/ClsKMwpcswq/DjsKGwqXDmUlXUcK0wqIzOsOQw7rD'
   // //                   + 'kMKNw7/CnsKEZTvDvcOnw5wiEVnDtmDCv1LCjBATwpvCixvCmVAHwokEcAzDszvCk8O8wqLDgMKe'
   // //                   + 'w4E5w7DDh8O/w7XCuAF3w7/DukFfw7/Dv8OWWcOrwpPDuUdGL1IoU2TDvMOFZylQw4M3R8KVwqZ/'
   // //                   + 'Qyl/w7nCjSlmesOjw7XCqcKrw4ZcwpvCqyQwCllzwrkQTGoXDAQiMyrChiHDqMOVwrpbOMKUwrHD'
   // //                   + 'oMOXw7/DtCoAAADDv8O7QGQBwojDsm5Gw4poIcOkw7AAAA0gAAABCMKxFSnCoQfCnkAAADTCgAAA'
   // //                   + 'BMK3b8O+woQXw7/Dv8OLwr56eMOjw7HDgcKMwrTCn2jDmUwaw5rCgjkswp7Dij/CnAh/w7nCsBjD'
   // //                   + 'iQ8+w5TCqy/CiE7CtcK2wpLCv8OWwoHCgsKDwocxwq8ow4A4JsKCR8O1w4TCiMOAw7HCjG3CkMKE'
   // //                   + 'QMKAwrkGf8O+QAt/w7/DvMODwp/Dv8O+w7t+NX8vwr7Cm8KjwqZ/R0TCrcOVE8KoISV+Ry7ClsKi'
   // //                   + 'w7/Ds8KRwoXDkz/Dl27DnMKpwrgJwpTDgEIQKcKRwqDCoMOgSsOiajEow4RqwoTCsVx4QF3Cn8O/'
   // //                   + 'wqnDu2oAw7/Du0BkAMKAAsOeR8OKbQLCoAgAAA0gwqAAAQY1LzPDuAnCgAAAADTCgwAAAAAAFG/D'
   // //                   + 'vcKAAcO0wr/DkMOpK2pILcK6SsK6w6jCqQTDkW1XScORw5Jew4cRw7dewpV/UktHw77CpGk6LMKn'
   // //                   + 'w5TCksOIwqlwc8KHwqDDvUZIPcKQFAzCgcKARkBhFsOwGWQYAcKgQTnChcKxJ8KFakITRWMTVTzD'
   // //                   + 'qHQ0RT/Dv8KkAAAAABgBw4AgH8Oxw6/DgAAAwqAKw77Cg37CpsO9f0vDn8O7el9fw5nCv8O/w7/D'
   // //                   + 'v8O/w7/CoA3CjcKVP8OWHMODf8OxwqwCwqYgFQAABwPDv8O/w7sQZALCj8OwwrxDw5IfAEAIAAAN'
   // //                   + 'IMOgAAEAAAHDvgAAACAAADTCgAAABMO/w7/Dv8O/w7/Dv8O/w7/Dv8O/w7/Dv8OywoUBAQESVUxB'
   // //                   + 'TUUzLjk4VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXDv8O7EGQYwo/D'
   // //                   + 'sAAAaQAAAAgAAA0gAAABAAABwqQAAAAgAAA0woAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
   // //                   + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ=='

   /**
    * This ~constant holds file bonk.mp3 as data uri
    *
    * @note : File https://github.com/scottschiller/SoundManager2/tree/master/demo/animation-2b/audio/bonk.mp3
    * @note : Data generated by ref 20190402°0623 'Dopiaza → data: URI Generator'
    * @id 20190402°0637
    * @type String
    */
   , sB64Dopiaza_Bonk_Mp3 : 'data:audio/mp3;base64,'
               + '/+OAxAAAAAAAAAAAAEluZm8AAAAPAAAABwAADQ4AJCQkJCQkJCQkJCQkJCRJSUlJSUlJSUlJ'
               + 'SUlJSW1tbW1tbW1tbW1tbW1tkpKSkpKSkpKSkpKSkpKStra2tra2tra2tra2trbb29vb29vb2'
               + '9vb29vb2///////////////////AAAAWkxBTUUzLjkyIAHDAAAAAAAAAAACQCQF2SEAAAAAAA'
               + '0OXWa08wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
               + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
               + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
               + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
               + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+OAxABa1IIMF5uwACCDBAGAB/8'
               + '6aEEGTrP/hZNdJTyqr/pn4OCRDARfjtIEHqAZfjEAZzj+AZkhOeMiITA2IE0A1rkeA6cdIA9G'
               + 'McA66Ro+MmOYSZqT4G0RQAGcoYgGMcNoGAQPQGJ4KH4wyIEXNjUiYGUkgoGMMRYGEkBIGFkLY'
               + 'GG8P4GGMDv8tmpPn0J4DEOL0DGmI8AYFQGEkHIGDUHIGDEBYGD4F3/NicKiaCSJfLYGBoAQr4'
               + 'GFIIgGDoGwGCYAgGCsC4WhAFAQAw7hT//PE+ZmREB5IkLgGAO8ghUAwXgbAaAuUwMAIHQMFYD'
               + 'wMQAngMUwZgIAJAx5CmAwpAQFrAwcAs//6d97vTdngYJAPAFAkAGAeK2DlAGABluASAMDAaAs'
               + 'L3gYBwBgYAwDgNAHDU///////AwBgDDfxkBjxS4aoGQWIIF0nxWgYoFgJoAwBABwFBBQMiCAH'
               + '//4GAUAIGAMA4DQBwAgDhc2MmBgWAgDY6AcA9UJAILy11W1dqwrXViy2OQCw1TFUqEku6WxLa'
               + 'ggJZ4skWaLxKbQemiY/+OCxCha9IJFQ9jwABJw+YDYFRgagfGCiDUYQ4UhhvilGSSRkauQAZg'
               + 'uA5mCgBuYC4DRgKgBBcBJxU5SzpgBADmAMAWYBQC5gFgGGAaAUYBIAxgDgBGAGAAWaQeV070d'
               + 'gBymHLDLDKmVMoEw1xZajTDtnsNKVBQAEwCgITBSAeMBcAgFABJFLucp3ozGYzLYzGcq0qpYz'
               + 'GYy5L+w67LszVqmv3dVYzLY1Gniac/0PRp/mlJiNeh6TyyNRqNQ1GYZf2GX9jLOXVgatTQ0/0'
               + 'PQWYEALbAkTlAVSs5a6zl/Xdh2My6mtayzq1aXKmlVymtU2WPa0n3n+tZY1X2TgjVNTU1al3j'
               + '+5mUfg0WUQn9ZWvyxu473zH/5r/5jzHX/zHDn719rLLn3bO+5VuxaGm/ZbLbUqtU1rLP48+l/'
               + 'Hm5bD1NTUtLZpsfwxxuZU2SPPcqaaQAhh+FryH0uXjKpcoDewl+bSaWw/SLjbQLj8agKecVQY'
               + 'FATAIARMA0CgwBgSzAVCgMFAdkxD47Tt0DxMGgRAwHwVTAtAHBwVhgyiBBgOSTMH//jgsRRWg'
               + 'yCFULXtuQ5FkPVXXrENw3ZinyWZDgGE5YWqR/J+P0gNEVBZdGEjl1wlmZgAkb+ljIIyOMR2td'
               + 'f7s3Fbzds47dprvwFI701C0yHDlMW5VhyelLWaO8MgTbROzjZc4MF3gn26qtiU/vstkOdu+6b'
               + 'R0TXks1pmVLtAosYDlE1+mY4CbaNMqlEbpb2oKk8kty2tauSKXyZusW+ih2GakYp2DVpRlRUU'
               + 'nmnjVAX3jVmJ87EpXEdSBuqVOMVFA1JhGCC4zBkqv3MotL5fRw1HpdnGpJD8odr56cgJyb0jm'
               + '3ihiHJuIu9KqODsvkUzhS1uSqWx0EAa/YQ/N+jcF8ZqGIgoEJBNBSV5hbC9sZqDr8MqW/L6sV'
               + 'l2MM2pIYKQJncuwwqmR50hLvF3Zl0dUbAs7ViSSi7QSKIS6Hc9Z27ECMHRnIgBDAGAaMAkFEw'
               + 'JwFzEzJPMjjX89/l5TFqBeMCUC0wEQATAoA6MEcGZLtXk5SdWTA29vrU1POVTvBQwfEZbbtQ9'
               + 'KZRD4oA2JAExp9XBhyXxJK8wCALmttYq1rcamv/44LEfVscgggNWvAAViw7L6zk9Vh+eytw9K'
               + 'mttugmdZokWo5RJ9Yu1LMGBV5fOP9uEEwAMlpIJbWahqdmqlWgn6Wwy59WI3ZbHZA4bymB6BI'
               + 'DAFm5xtUiw1q/GXrsw5uVPLDVSnhFR+FtwKuxe0odCHpdTY3aTeFXka5L9KrAYBKV0UruS7KR'
               + '3rlM6Rf7O8IgAXsQVijiSx5VrLCt86jEXVWbYclwoBj7IlH2ssGpJG6NiIPhGnLaWuZe7uxJ/'
               + 'YTMu03Z2WbQA3GSqbLqaS4sOupDcvf2rF4csW3Rrqyr2lcMUuT1ONYu3KGWwqgqOjCIy+2FuU'
               + 'hYAeBcoRTVBCSCRkof4QBfxYWZQMRCQAd1kQCzHgTXLwA6pYCCAFTAtBRMD8A8wOAcTBoAvMF'
               + 'UQ6GoZRCMKEQcwQJFzHkCyMMINwwiBNTHuK1MwwuswSAgVbn3Y0wIwvARi7Jg+AoAIDkwFwCz'
               + 'CwDVMKwEcwNAbzCAB1MDADCD4KhrN4jAwAOAoD5gNgDoCTAnAZDAMzA6BpMFYCcwBQVjAmA/M'
               + 'BIAQwMQUIat/+OCxKV/zGIABZrwAMBRK/NGBWBKQgDquMCEBtC9SwwGQATAMAVEIERgWgPBcA'
               + 'wwIwKgwCswCwJq1/H8pmqVAAAUATDQIAGFgCAAAIYBAACxTASAEMCUBQqgRmAiBIPARGAYBWY'
               + 'AYBRYALMBgB198JmryrV5vY8ABPGAMAAvFWNPARgImBAAOhPLVs3MAMAMwCAFwwCEEAHmAsAm'
               + 'CAADACAXAQEIhAUAgAqNhgFgJNdxrZbmq3a1butJ1v0YBIA8aZIgPTQXQ+4QAAtRUiDiXKNgN'
               + 'AIAwCyRxgBgCISwSAUBgEiAAkEgCK/AAB6gSMoCAFZj3HHUzVwmavKtXn+zR/ggAxmKQb8l91'
               + 'L0w3HTDLfoL0KAeLqELfTsYKAABU4AsACBgBUdAYAGmaFwBkEq+ACAFOoZJ9JpFtmHoCkNkdc'
               + 'a2W61btat3Wu739XH6qokhHEYI6j8M4aRRKZP2lS1p8UxbTope7WqTEFNRTMuOTKqqqqqqqqq'
               + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/jgsQ6AAADSAHAA'
               + 'ACqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
               + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
               + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45Mqqqqqqq'
               + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
               + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
               + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
               + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
               + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/44LE/wAAA0gAAAAAqqqqqqqqqqqqqqqqqqqqqqqqq'
               + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
               + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
               + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
               + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
               + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
               + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
               + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
               + 'qqqq'

   /**
    * This ~constant holds file fingerplop2.mp3 as data uri
    *
    * @note : File https://github.com/scottschiller/SoundManager2/tree/master/demo/animation-2b/audio/fingerplop2.mp3
    * @note : Data generated by ref 20190402°0623 'Dopiaza → data: URI Generator'
    * @id 20190402°0633
    * @type String
    */
   , sB64Dopiaza_Fingerplop2_Mp3 : 'data:audio/mp3;base64,'
               + '//uQbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAAIKABA'
               + 'QEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgICAgICAgICAgICAgICAwMDAwMDA'
               + 'wMDAwMDAwMDAwMDAwMDAwMDAwP////////////////////////////////8AAAA5TEFNRTMuO'
               + 'TcgAaoAAAAALBcAABSAJAXNTgAAgAAACChX+laoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
               + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
               + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
               + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
               + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQbAAAA00Qzg1h4AAtwRmipI'
               + 'wAEXFZjblqMBkXGq93KKICAFL8CjNKzSNcQIQcrHRSkTEgFIdVYdg8FJeJgREFICoHA4Kct5O'
               + 'y5nWoFYrHkSkRg+D4Pg+CAIAgUBMHwffBAEAQOCQEIPg+4HwfKAmD5/DCz/y4IHOUBAEHawff'
               + '4IS4P3+XygIfUcKAh9SoBsnkgFCBAQAgAMAYGw2T6ogOQfB8P+Xf8uH0fX4nqB9///n/iB3/g'
               + '+f/ghQsBgMBgNRgMBQJAwEABhMDmAAZrRgcA4jgfFdDzHA0Ls8Az/BnKvA/G8DlYfAouCAOAU'
               + 'B/C0AcAjQZKr8GxwVENsAEIgZMF/4nEMcEGh+oIh4IhP/42gQiwahCmGJCDJ//5IBqwphc4PB'
               + 'NidBHhM62//xQAyhLFgdJWNU5UMf///MEGcuFxNlus+jVgOBwMBwOBwOBgKBAAAEBAc/wQCAM'
               + 'iCrwNRcBZo1o9ET4KhXLfk4+Ki1/qSEhKf/541EiTjz/84gISY9G//7qe6Fy//A/YkmQIjbLb'
               + 'bLrdpXbLbdW6uhNGS/T//uSbAoAA+ZhXO4lYARAilqqxYgADnFZPl2RgAjWg+lrkiAAxULmna'
               + 'KsWNEmpHs4wfU1UVHbE2k0xNadXVXdvOnEpOTNdvfw+y917v2vr/+Lbf1df/x26Yafs5NJb2F'
               + 'oIxv2z90Zu6KqnzPJsfqJi/lGYbtrf3ctN7e2uo/8wAcggCZQ8dj+X/dOPwmgAAAADCAcBgVj'
               + 'AVjiZdpiM8gKYBO4DR8NJ9P/bN/vn/+YQRW//7Uv//qWhy7687E/73JM63///+xHcERpVzGhq'
               + 'sAkaAT4qRtm8rkspbycR3MIdF40hTwZHgFhXlpCFkKghIybnBUKC6c8mHKWAjUEDfTEEaWGjv'
               + 'YxBWc8MjJlLXPa02mC4vOewEtnf86Uzd9aVIjI7OFCU0uxNXXPFBQh9NMMKFMYbT33LXpB/Bp'
               + 'Thx3+dk6gNABEhWmnay9qtkrM4bFAlJXM2e9T/8gfETjK1dRT9f1Ega8kGf/8b6/2D2gkTH73'
               + 'qYSWArHVM5R7LZ2vTT4wuketlSHIVcWiQRK3OhKbRA9GFn6s4pAiYYH4jh6MhGuZxP/7kmwVg'
               + 'APKQU2FYQACTsxaPKQIAQ8NQTk5NoABLZrrtwSAAnQeLiOOGCxLEM4cmrTkGjMaS8rrmp20Ir'
               + 'V9afbeq8y6Dlgw6BnaXTQtpaDyx1U2wz7H4ioy2jgJph6M3wD1Xc5se6X3fb5ALjetuqxM9UE'
               + 'lAJugcg2xdVxrJociwQpcQizJM6nIr////h0XyTJY5cj3UmQmdv6097rRHsiI3e1n7Xn6USZO'
               + '2Sh7Z0u+qXWbVrISiX6OlpmuLd4K7RYAADBDwCBBSAAA0RAWL2NUcwaodFgdksDcQn7BtD1JI'
               + 'pZ0glxFZd7lh8cpQJE8beaoFE2Hokkuj8oIEufKJkcRYypfol9IxcyK00kq2/yktIvmh41Nyt'
               + 'aklo9X/JQkSaYoGsooJr1+tH/+dcRARkRlG3rOqJM/ywJNhoFDYSC4Wi0Wi0WAADHKXBCKYmZ'
               + '8G4qAMFvSaXX+yZQwVQW/ximFkQ3r/70pd8L///jfiZ5j9r//x6kU8Cp4wOh0JCX0gy4YPI5V'
               + 'ADPoAUKpMKbUMBCjCgImAWVL3GPpUUksCINEyYr/+5JsDo/zETAjtw0gAi+jRHHgiABAAAGkA'
               + 'AAAIAAANIAAAARRb//5SLAkGmwqCJKkFhSSocWRNKksxSKYLImrVRImtVQxpFkpeMY+oqxySI'
               + 'qDf//CGgpIJd/6imhRwMN6blkdFdSK4diQBhDEIUxCFCFEJv9SlmMZSm/ugYzlASwgV0Js0F4'
               + 'N6FHArB3//xTQp4v//8jorqVMQU1FMy45N1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
               + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
               + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
               + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
               + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
               + 'VVVVVVVVVVVV'

   /**
    * This ~constant holds file fingerplop.mp3 as data uri
    *
    * @note : File https://github.com/scottschiller/SoundManager2/tree/master/demo/animation-2b/audio/fingerplop.mp3
    * @note : Data generated by ref 20190402°0623 'Dopiaza → data: URI Generator'
    * @id 20190402°0635
    * @type String
    */
   , sB64Dopiaza_Fingerplop_Mp3 : 'data:audio/mp3;base64,'
               + '//uQbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAIAAAOsAAg'
               + 'ICAgICAgICAgICBAQEBAQEBAQEBAQEBgYGBgYGBgYGBgYGBggICAgICAgICAgICAoKCgoKCg'
               + 'oKCgoKCgoMDAwMDAwMDAwMDAwODg4ODg4ODg4ODg4OD///////////////8AAAA5TEFNRTMuO'
               + 'TcgAaoAAAAALhcAABSAJAVlTgAAgAAADrAEMJhfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
               + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
               + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
               + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
               + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQbAAAAzIazQ1p4AAtQUmqpI'
               + 'gBEcEHf7n6sBkdkPK3NyiCAIw4cw4NEcLCjQNjkVDtVDgFDGtz8fj6WjbDBUeZ1CZ8qDibpIq'
               + 'AEYBGAniZmXOwHIaA9ZO1HCTiGIYyQ0MQxQKx48iZfoYoFZE1d/HD3wfB8+Iz5Q5/EAIQQdP/'
               + 'fy8EDkMS/5cHwAACJWhSA9zn1EDkYIBhi0aNHOg4s+UlJPqOSjvxAAw/wQ/8oGHVn8Tn//rB/'
               + 'IYDAYDAcDsWiAMBAAAwPwIlMVjJxN//mJgGIpzYxgdK3hjLXjC0AKgwlEFS7/fA0mygNFjrwP'
               + 'lt0DG7mA0CHvwNEPUDAgZAx0AgM+HH/A46EAPjOIDGAMAWCIYhot/CyADAgNAYE4EAEDQKCCP'
               + 'f/KZPCABABCY6NX//KJDxlCZIxAjjM///+RYprMYTAYwGA4GA4GAwFAgA4AAAFRAygb//8+G9'
               + 'NRo7t//ABAYiLf/+A+A2/xOoX9AIb8ZcTsPsu/4lpPG5cMP/dE+dRP/oGqA//1yMThEWgTHMd'
               + '29TxR605kUwoOOJPOs5//uSbAoIE3dO0x9owAIqQOos7AgBED01NM2xC8ixkWh0LAhlMUDLQp'
               + '0xSLS3ZaMt21aJ1aJCWrXpfmczO1dKvONMtW81AlLbvnGZ/TVszPnGJXM55lq5qLG4S2ZztPq'
               + 'nmt9b5lq03TcOrzLTlftsz5z1sy0yxJKpB//9Kw2KGGkAAAAUADp7EvgazEoGYEpeFZGlKas7'
               + 'wKArT7MtkVRK7//////////apQl6R4DJZETpfPuomYIEEoIVgYkqmtpx8YAj8DUOjkH01YKr3'
               + 'j34bOLLLuMYXIar+7Pgeej5QhJzbI6LKGi5qFymwyGe4Vn5vnmbTZJtC5vm6fyLSnSX9UV6p0'
               + 'tHZBchXdpig7FgUCUPBeDT0GugsIg1RuhLEDwrgiHovcxl1v9+nfsAACQRMZ0mF3QUruxUZEs'
               + 'yXyG3YFgD+kV7pUv/1MFQKQUoo6s3W94nCsubojWNsoqoixak6TpvApkBRg4M7ADeZOvmNAbB'
               + 'oBl7BYIi7+phIEnLlFo9qkolcLnC4bTEm8y5I0hrrk7ei3RSxt/f10iNbP3s8nWMXv/7kmwlD'
               + 'AOtT04bOjIgL2FJyg8DJRC9EyZN8MiJAYRodBeIxM7n7f1JcJmtXymuSrROLjNVU5udrntssl'
               + 'h2s7XMM3nMno7ksueEguNHO/9wAAYKAAAACRKMDaLp7KZAV5fB14OJvQtEakrlgWBoHg6cDx3'
               + '////////aLb2isihRSkOrHTIQgWAEGi4T6BggZ2MmZRhqEKd6NZMSA4TNq976SDjkco8JIAI1'
               + 'PCQlApCXYpFMgm72pBM5qSbPLGH0NnX2EzYX4wuLNKzl78Rxgadb/W+4N02B+SLgq6ZzN+vP4'
               + 'I6aWY8XTmQYWm9BR8AOLAa2xsqquYPMPgW76znu/uW7Wc7+sBkADYa6WSNhyCFGFJiyhycABg'
               + '0Dr9YJPDYDPSgaQ/iqEgtFAFcph45KJHmTIo0SBOEE0ixscST01G22/E7HnPpVLIxG2MKDWpD'
               + 'wqouYYDgkFKgoOpAXRjVCkWBWUOpOAESNIBy2jQQo9ZR9DyyOxCfRr5VaCQWY7Uo4pU+LNpt+'
               + 'dfyNRbO5UY1CVhYyZiEws8YxYpdYMmZs6SKeSXf/+5JsLgwEGGZIi2YbckFB+cwsI2UPUZEgL'
               + 'hhtCUiW57QjDC0w7hDLKdbakKVgkWEbnUJ1PY3Km4NBP5Xu8yk7NXqdTn/njiGlgpoAABRO2U'
               + 'rBObETvEcmgoDaK3jQNwt1QoCPLIqE5pH3D988hbzsZt2PihRxl4uGGuL1VpKlLlFWpUGwLCK'
               + '1BZchB0QDjwpDg8miyxKl+wACTA4IBo7FjeFgKHBYu7H51EGSjU0zblgedvCPNiYFKLyaJogo'
               + 'SyEWKzeamLbL7kJUkGXLCXkbNhBAmgoURytCNjLFQiztseczPek3gvJgUkN4eWqluZ9P4WP14'
               + 'cMy1hzPnPKfnWcLcOFWE+lmZDiA+u010rbAmdOw8AQCR8WL2iqaRWMw5rJlluxw0HT1LFlFJn'
               + 'wRhxG/CUl800PsUHMwTM4bHwKF6NnJi8h9q2RnQ36CXB9X0//tyUN7Vp4xT6wAgYH5wEhAVBn'
               + 'm7NeYinIBDDY3OJxq7Xp7ESH6LN1wYFoOwDBRqbALGpm6h4jhY/KRVSSebeb0akJCDstUjK9/'
               + 'EEmZnYVnmy5R//uSbCSIA5lISKtZGFJE4QndBMIXTMlLKywM1cD9FWZ0JgzIjpCTZXTd8bpMi'
               + 'PbHq1iYW8dCvS+4nM/fRJ8kQNx6h7t/0fNvjvesMVJTAxhjRxy2NJCz2mxpoEOrgFWMt7b7l/'
               + '4X23aBMzHcl2Ao80cOWiDiI5bTG4z9+6y2nsOjN6fzP/83G9/wvT/c3rvut++8KSfZIBIxYMb'
               + 'hyQ0epgdBfCKxi/+63LVbtjPWW8+f3/xQEhulCkWeHPciRXY0rv5McY+f5FPnInOvELco74va'
               + 'KV5L2H1FjWs2WUi5+Q680VAkkOI9KyMItvmGjWZNjQg6Zxa46//7QiADZXI64ggdyz4uEgDPJ'
               + 'kFMqNLcjKZkLU7eEFd7PIiI4R+zHO+2+V4ZHEpPxKCApdbgOKpI3cnaOu//6uy6mgAG2LqlA6'
               + 'QHtMbVsBVMREoW+ByHTDqHqxXFysR/5ucTH6hFZoOTyZU9uscrq6Efe5QUBDIbFAKSUaU8fgZ'
               + 'awwMHhZBGUczARAGiAwWeyRGgMDIMqXlM47t0jtKbRMds/6VBLn3Ug+J2cf/7kmw0gALXKcrK'
               + 'DxhAQ+C6PAgjE8oUezGmPGZI/oep9ACMPwODxC3ATE5IY6hjG2sKmrf76leN/fjJ18NoFsDpb'
               + 'y/at02/GuJs+756He86kd0St7v/dBwHCAQAcbbUjbaAETVClz/o+RRNt4IQMZHrkhttCnufPI'
               + 'o8laBaTuRYaYYJACjolY/8bu2gJsHuv91nbVzBuiamUH7cCIv4VOq+zNFfb3e5aq2DIkjEs2k'
               + 'kbSIM0ob7zd0dmbKDIo9O/H2gefylByZY7VOoeGw+evSVFHrS+/23c9rtL1YEd+vxh66l7f+f'
               + '/////BEOCGtsO2SmKnwNlRamiyCHgkiRmyf5URQRkv9JHIznbmhpdEGGNDKc763JIS9Kz4fwv'
               + '7TPpF/l6925GrEimzjgqpRxDI2yV/X/xLr5/Q67z1PC7v0a57eq62OCP1CE0Vu2ttkjjGyqro'
               + 'WC3Oh5lczsavVTSIZixhWK2dAcXLKkzyN8A4TZkaQiKcjoSRyrKhhxAL1w6WUbijCgaEFINnr'
               + 'KIfz9i0CCgZlC8i1C1eXGziUgFwyZC6n/+5JsXAAC8kJJCw8YUkdoef0UI8kLxEskx7DASSgO'
               + '5nQRGS3S86WO0vuPVG5KV06afybaIaLxx5TqaK5EChIScErf9UxVhwSdf6h2KpWXoNGe4FlyN'
               + '+88W9zZtmokxUUli/fn2qy//fN/7C3alx1oJtwUXWuKEkCvacxK8YcnvYySuVEGq0Mc68OfJr'
               + '79x/kJwfl0b3hMLGniyrWwYFgqy4um5z+Py4//KyycWOhcfllxr/8VYrvpvZYGiTLVwp9prlR'
               + '2xLpVKZJK5BIgCDCRYYKNMTRJCS0Epa1EjS0FonPCRpcXlTGzLPGzTt9llZ/VHZyojlRblMlv'
               + 'ojs6o7GRbt//+n9n9kVnKYKpHKis5VuyLf2fp/RVT+qKR2MUMCHOACmJqp22XZ82Wdv7DJlkc'
               + 'muZSGrVBwEMCDoOJBkVJP2gIWNBUkaZ////oAopTEFNRTMuOTdVVVVVVVVVVVVVVVVVVVVVVV'
               + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
               + 'VVVVV//uSbHQP8zNoQIMGE3Itg7gxGANyAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVV'
               + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
               + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
               + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
               + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
               + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
               + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
               + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ=='

   /**
    * This ~constant holds file mouseover.mp3 as base64, generated
    *  from ref 20190402°0623 'Dopiaza → data: URI Generator'
    *
    * @id 20190402°0631
    * @note : File https://github.com/scottschiller/SoundManager2/tree/master/demo/_mp3/mouseover.mp3
    * @note : Data generated by ref 20190402°0623 'Dopiaza → data: URI Generator'
    * @note : Remember issue 20190402°0611 'audio data source does not work'
    * @note : It works with mime-type mp3 and mpeg, but not with mpeg3
    * @note : Tested with browsers Chrome 64, Edge 42, FF 66, IE 9, Opera 58, Vivaldi 2.4
    * @type String
    */
   , sB64Dopiaza_MouseOverMp3 : 'data:audio/mp3;base64,'
               + '//tQZAAAAFwA4fUAAAgAAA0goAABEX2nRBh6AAAAADSDAAAADgAADwAAAAAuf+GBGB94Awi+'
               + 'D0AXyaHO8ZYho5v4ypDhzhW3+Q0c0VqQ4XN/4rYhouUQqOUK2//ELDGigQ+EY4PiDI3/+K6G'
               + 'RQtBD9guGBtIBwMDFDQGgv9av+WQMH3A0jkDAlgMmIBs8LSGAQyyOoUEOoDSWC2i35DQNzLJ'
               + 'H/FzENGZIKUiBE8sumqjZNaP////6mnUpkoHd3iZh3+21gm2hkZGZBEmmBBNS//7YGQKCPOt'
               + 'RFD/BoACAAANIOAAAQltFymgj7dAAAA0gAAABFLUt3Z2dnQWtS1d2Z2qWpalLs7OzugtS1LV'
               + 'Z2dnQTQUtS1LdndnZNBalrUt2dnZBNBNS1LSSR3ZaC1qEIQudA7TYAJMI+cxNiav/UDC1VAy'
               + 'qq/6Wf2mmkYqqjpoquqqt9VQAtH/9gj///+vn/hl8sjw7/zI/WWpwy6Cl8H9k/I72yz///vZ'
               + 'LmTLLZ//upX1RuoleYMAscsrwZPAIJAurA1+G5RT4fLCwq65v9eRAAAAF4H8rCH///381//k'
               + 'eC2yai2+D/6t+vu5af+n1evb//hL4pIm7INggBwwIwrTLUYdMP/7IGQaDPIvRcroIva4AAAN'
               + 'IAAAAQhZFypgi9ygAAA0gAAABMUGUwFAFCy6KjEHHikv//7f0j/6wBf///XzX+/mdMnsEw1g'
               + 'wevqMv1tTdE/9frk7//8p1+muqYioAgUAfBIXxiaNeGCWDsYAACqSzc4u+Uinf///J0AAAAT'
               + 'b//IJ///+0BkBIjyXkZKaCLvIAAADSAAAAEJbRsroIucgAAANIAAAAT//f6XT5aMlyyvzoal'
               + '2UlXUbSiMzrQ+tCN/56EZTv959wiEVn2YL9SjBATm4sbmVAHiQRwDPM7k/yiwJ7BOfDH//W4'
               + 'AXf/+kFf///WWeuT+UdGL1IoU2T8xWcpUMM3R5Wmf0Mpf/mNKWZ64/Wpq8Zcm6skMApZc7kQ'
               + 'TGoXDAQiMyqGIejVuls4lLHg1//0KgAAAP/7QGQBiPJuRspoIeTwAAANIAAAAQixFSmhB55A'
               + 'AAA0gAAABLdv/oQX///Lvnp44/HBjLSfaNlMGtqCOSyeyj+cCH/5sBjJDz7Uqy+ITrW2kr/W'
               + 'gYKDhzGvKMA4JoJH9cSIwPGMbZCEQIC5Bn/+QAt///zDn//++341fy++m6Omf0dErdUTqCEl'
               + 'fkculqL/85GF0z/XbtypuAmUwEIQKZGgoOBK4moxKMRqhLFceEBdn/+p+2oA//tAZACAAt5H'
               + 'ym0CoAgAAA0goAABBjUvM/gJgAAAADSDAAAAAAAUb/2AAfS/0Okrakgtukq66KkE0W1XSdHS'
               + 'XscR916Vf1JLR/6kaTosp9SSyKlwc4eg/UZIPZAUDIGARkBhFvAZZBgBoEE5hbEnhWpCE0Vj'
               + 'E1U86HQ0RT//pAAAAAAYAcAgH/HvwAAAoAr+g36m/X9L3/t6X1/Zv///////oA2NlT/WHMN/'
               + '8awCpiAVAAAHA///+xBkAo/wvEPSHwBACAAADSDgAAEAAAH+AAAAIAAANIAAAAT/////////'
               + '///////yhQEBARJVTEFNRTMuOThVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
               + 'VVVVVVVVVf/7EGQYj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVV'
               + 'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
               + 'VVVV'
};

/**
 * This namespace holds CanvasGear functions
 *
 * @id 20180618°0631
 */
Cvgr.Func = {};

/**
 * This namespace holds CanvasGear objects
 *
 * @id 20180618°0641
 */
Cvgr.Objs = {};

/**
 * This namespace holds CanvasGear global variables
 *
 * @id 20180618°0651
 */
Cvgr.Vars =
{
   /**
    * This flag is experimental ..
    *
    * @id 20180618°0642
    */
   bFlagTipTopTest : false

   /**
    * This flag tells whether SoundManager2 has failed loading
    *
    * @id 20190401°1315
    */
   , bSoundLibraryFailed : false

   /**
    * This flag tells whether SoundManager2 is loaded
    *
    * @id 20190401°1316
    */
   , bSoundLibraryLoaded : false

   /**
    * This flag tells whether SoundManager2 is wanted to load
    *
    * @id 20190401°1317
    */
   , bSoundLibraryLoading : false

   /**
    * This flag tells whether SoundManager2 is wanted to load
    *
    * @id 20190401°1318
    */
   , bSoundLibraryReady : false

   /**
    * This flag is a humble helper
    *
    * @id 20190331°0331
    */
   , bTemplateSearchFinished : false

   /**
    * This function is prepared for SoundManager2
    *
    * @id 20190401°1421
    */
   , fNoise : null

   /**
    * This number stores the CanvasGear start seconds
    *
    * @id 20180618°0643
    */
   , iTimeStart : 0

   /**
    * This number stores the CanvasGear start milliseconds
    *
    * @id 20180618°0644
    */
   , iTimeStartMs : 0 // unused so far

};

// initialize
Cvgr.Vars.iTimeStart = new Date();
Cvgr.Vars.iTimeStart.getTime();
Cvgr.Vars.iTimeStartMs = Cvgr.Vars.iTimeStart.getMilliseconds();

// initialize controls [seq 20140926°0811]
// note : This should be done after the document is completely loaded.
Cvgr.Vars.radiobuttn = document.getElementById("i20140819o1822"); // top
if (Cvgr.Vars.radiobuttn !== null)
{
   Cvgr.Vars.radiobuttn.checked = true;
}

/**
 * This class represents an algorithm object
 *
 * This shall store a drawing algorithm which acts on an Ikon object.
 * This design proposal is probably obsolete because replaced by namespace Algos.
 *
 * @id 20140815°1231
 * @status Under construction, implementation yet unclear
 * @note Compare ...
 */
Cvgr.Objs.Algo = function()
{
   this.Canvas = null;                                 // Canvas object - the canvas tag [prop 20140916°0552]
   this.Context = null;                                // Context object - attached to canvas [prop 20140916°0553]
   this.Funktion = null;                               // function - ... [prop 20140916°0554]
   this.Ikon = null;                                   // Ikon object - ...  [prop 20140916°0555]
   this.draw = function x()                            // function - The wanted algorithm  [prop 20140916°0556]
   {
      // The drawing function shall be provided by the caller
   };
};

/**
 * This class represents an icon object
 *
 * @id 20140815°1321 [[20140815°1221]]
 * @note Line 'this.Algo = Cvgr.Func.algoPulse;' is bad, it makes
 *        the script disappear [note 20140828°0722]
 * @callers Only • func 20140815°1241 startCanvasGear
 */
Cvgr.Objs.Ikon = function()
{

   // public properties, to be set by user via HTML comment [seq 20140815°1322]
   this.AlgoName = ''; // 'pulse'                      // string - algorithm (workaround for Algo) [prop 20140916°0512]
   this.BgColor = 'Transparent';                       // string - background color as RGB or webcolor [prop 20140916°0513]
   this.Color = 'Silver';                              // [prop 20140916°0514] string - RGB or webcolor
   this.Color2 = 'Gray';                               // [prop 20140916°0515] string - RGB or webcolor 
   this.Color3 = 'SlateGray';                          // string - RGB or webcolor (nowhere used?) [prop 20140916°0516]
   this.Hertz = 0.1;        ;                          // number - frequency in Hz [prop 20140916°0517]
   this.Ide = null;                                    // string - canvas ID, read from HTML [prop 20140926°0311]
   this.ShiftX = 0;                                    // int - horizontal offset (in pixel) [prop 20140916°0518]
   this.ShiftY = 0;                                    // int - vertical offset (in pixel) [prop 20140916°0522]
   this.SizeFactor = 1;                                // number - enlarge/reduce relative to automatic size [prop 20190328°0831]
   // this.Speed = null;                               // number - might complement Hertz [prop 20140916°0523]

   // constant properties, set from the canvas HTML attributes [seq 20140815°1323]
   // // this.Diameter;                                // number - canvas size (in meter) [var 20140926°1331]
   this.Height = null;                                 // int - canvas height (in pixel) [prop 20140916°0524]
   this.Width = null;                                  // int - canvas width (in pixel) [prop 20140916°0525]

   // runtime private properties, set program internally [seq 20140815°1324]
   this.Angle = 0;                                     // private [prop 20140916°0527]
   this.Canvas = null;                                 // object - the canvas tag DOM element [prop 20140916°0528]
   this.CmdsHash = null;                               // object/array - the commandline as an associative array [var 20140926°0651]
   this.Command = ''; // null;                         // string - the commandline as read from the html comment [prop 20140916°0532]
   this.Context = null;                                // object - attached to canvas [prop 20140916°0533]
   this.DrawNumberLimit = 1;                           // Draw frame one time, 0 means forever [prop 20190401°0433]
   this.iDrawCount = 0;                                // integer how often the icon is drawn completely [prop 20140916°0534]
   this.bIsDefaultSettingDone = false;                 // [prop 20190330°0353] important moment, now the icon is available
   this.iFrameDelay = 0;                               // [prop 20190401°0453] See finding 20190401°0451 'frame delay with pulled-behind canvases'
};

/**
 * This class represents one straight line
 *
 * @id 20140901°0511
 * @callers • function algoLines()
 * @status experimental, embryonic
 * @param {number} iX1 — x position start
 * @param {number} iY1 — y position start
 * @param {number} iX2 — x position end
 * @param {number} iY2 — y position end
 * @param {string} sColor — The web color name (see func 20140831°0321 Webcolors)
 * @param {number} iWidth — Optional, width in pixel
 */
Cvgr.Objs.Line = function(iX1, iY1, iX2, iY2, sColor, iThick)
{
   // workaround for missing default parameter [seq 20190312°0253]
   //  Remember issue 20190312°0251 'IE fails with default params'
   if (iWidth === undefined) {
       var iWidth = 2;
   }

   this.X1 = iX1;
   this.Y1 = iY1;
   this.X2 = iX2;
   this.Y2 = iY2;
   this.Colo = Trekta.Util2.colorNameToHex(sColor);
   this.Width = iThick;
};

/**
 * This class represents a two-dimensional point object
 *
 * @id 20140815°1331 [[20140815°1221]]
 * @see ref 20140926°1231 'tutorial : write class in js'
 * @see ref 20140926°1413 'stoyan : define javascript class'
 * @see Book ref 20111031°1322 'Harms & Diaz : JavaScript object orientation ..'
 * @note This function is named with a typo to allow a more distinctive text-search.
 * @callers • None yet
 * @param {number} nX — The x positon of the point
 * @param {number} nY — The y positon of the point
 */
Cvgr.Objs.Pojnt = function(nX, nY)
{
   // [seq 20140815°1332]
   this.ptX = nX;
   this.ptY = nY;
   this.Colhor = "Red";

   /*
    * Function just for fun
    *
    * @id 20140815°1333
    * @return {String}
    */
   this.getIt = function()
   {
      return ( 'Pojnt ' + ' ' + this.x + '/' + this.Y + this.Colhor + ' apple' );
   };
};

// Some 'static' variables for below function startCanvasGear()
Cvgr.Vars.icos = new Array();                          // [var 20140815°1246]
Cvgr.Vars.iFrameNo = 0;                                // [var 20140815°1247]

/**
 * This function starts CanvasGear
 *
 * @id 20140815°1241
 * @callers The page's body tag onload event or the onload event daisychain.
 *
 */
Cvgr.startCanvasGear = function()
{

   /**
    * This anonymous function might register the test radiobutton click handler.
    *
    * @id 20140819°1811
    * @see todo 20190330°0121 'register test buttons cleanup'
    * @note Does not work as expected. We need still onclick in HTML.
    * @note This can also be defined outside this function on script level.
    * @note Experimental shutdown 20170302°0321 did not work as expected
    * @todo 20160612°0341 : This function will destroy any already existing
    *     onload handlers. Use func 20160614°0331 windowOnloadDaisychain!
    */
   window.onload = function()
   {
      var bt1 = document.getElementById("i20140819o1821");
      var bt2 = document.getElementById("i20140819o1822");
      bt1.onclick = Cvgr.Func.setRadiobutton;
      bt2.onclick = Cvgr.Func.setRadiobutton;
   };

   // seq 20140815°0651 'workaround for missing requestAnimFrame'
   //  This provides a fallback for possibly missing requestAnimationFrame method.
   // see : issue 20140815°0641 'browser is missing requestAnimationFrame'
   // see : ref 20140815°0634 'paul irish : requestAnimationFrame'
   // see : ref 20140815°0635 'paul irish : requestAnimationFrame shim'
   //--------------------------------------------------
   // shim layer with setTimeout fallback
   window.requestAnimFrame = (function()
   {
      return window.requestAnimationFrame
              || window.webkitRequestAnimationFrame
               || window.mozRequestAnimationFrame
                || window.msRequestAnimationFrame
                 || function( callback )
                    {
                       window.setTimeout(callback, 1000 / 60);
                    };
   })();
   //--------------------------------------------------

   // retrieve all canvases [seq 20140815°0941]
   var canvases = document.getElementsByTagName("canvas");
   // note : canvases is of type 'HTMLCollection[]' now

   // () loop over canvases and provide an Ikon object for each [seq 20140815°0942]
   for (var i = 0; i < canvases.length; i++)
   {
      // () possibly skip this canvas [seq 20140815°0943]
      // if the string 'skipthis' is found in the canvas HTML element
      if (canvases[i].outerHTML.indexOf("skipthis") > -1 ) {
         continue;
      }

      // () create Ikon object for this one canvas [seq 20140815°0944]
      var ico = new Cvgr.Objs.Ikon();

      // () basic properties setting [seq 20140815°0945]
      //  The values which are known from the canvas
      ico.Canvas = canvases[i];
      ico.Context = canvases[i].getContext('2d');
      ico.Ide = canvases[i].id;
      ico.Width = ico.Canvas.width;
      ico.Height = ico.Canvas.height;

      // () read commandline [line 20140830°0311 v 20180619°0211]
      ico.Command = ico.Canvas['attributes']['data-cvgr'].value;
      // Now ico.Command is known, e.g. "algo=pulse hertz=111 color=orange"

      // () parse commandline [line 20140815°0946]
      ico.CmdsHash = Trekta.Util2.CmdlinParser.parse(ico.Command, true);

      // set AlgoName in advance [line 20190330°0221]
      ico.AlgoName = ( ( 'algo' in ico.CmdsHash ) && (ico.CmdsHash['algo'] !== '') )
                    ? ico.CmdsHash['algo']
                     : 'pulse'
                      ;

      // (O) put it on array of canvases [line 20140904°0656]
      Cvgr.Vars.icos.push(ico);
   }

   // [line 20140904°0657]
   canvases = null; // deleting a canvas is no good idea, better set it null

   // ignit continuous drawing [seq 20140815°0947]
   Cvgr.Func.executeFrame();
};

/**
 * This array stores the AlgoName of the pulled-behind script
 *
 * Important: All three aPull* arrays have their indices in parallel
 *
 * @id 20190330°0341
 * @see todo 20190401°0523 'combine piggy variables'
 */
Cvgr.Vars.aPiggyAlgoNames = [];

/**
 * This array stores the module names for the second pullbehind attempt
 *
 * @id 20190331°0315
 * @see todo 20190401°0523 'combine piggy variables'
 */
Cvgr.Vars.aPiggyModuleNamesTwo = [];

/**
 * The callback stockpile array is the brute force helper for
 *  solving issue 20190330°0355 'callback parameters useless'
 *
 * @id [var 20190330°0415]
 * @note Remember todo 20190330°0423 'catch callback stockpile array overflow'
 * @see todo 20190401°0523 'combine piggy variables'
 * @type {Array}
 */
Cvgr.Vars.aPiggyCallbacks = [];
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 0 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 0 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 0 ); } )
                                   , ( function() { Cvgr.Func.pullbehind_onError( 0 ); } )
                                    ]);
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 1 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 1 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 1 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 1 ); } )
                                    ]);

Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 2 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 2 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 2 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 2 ); } )
                                    ]);
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 3 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 3 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 3 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 3 ); } )
                                    ]);
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 4 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 4 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 4 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 4 ); } )
                                    ]);
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 5 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 5 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 5 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 5 ); } )
                                    ]);
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 6 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 6 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 6 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 6 ); } )
                                    ]);
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 7 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 7 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 7 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 7 ); } )
                                    ]);
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 8 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 8 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 8 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 8 ); } )
                                    ]);
Cvgr.Vars.aPiggyCallbacks.push( [ ( function() { Cvgr.Func.pullbehind_onLoad( 9 ); } )
                                 , ( function() { Cvgr.Func.pullbehind_onError( 9 ); } )
                                  , ( function() { Cvgr.Func.pullbehind_onLoad( 9 ); } ) 
                                   , ( function() { Cvgr.Func.pullbehind_onError( 9 ); } )
                                    ]);

/**
 * This array stores error flags associated with the pullback attempts
 *
 * @id 20190331°0313
 * @see todo 20190401°0523 'combine piggy variables'
 */
Cvgr.Vars.aPiggyFlags4Avail = [];

/**
 * This array stores error flags associated with the pullback attempts
 *
 * @id 20190331°0311
 * @see todo 20190401°0523 'combine piggy variables'
 */
Cvgr.Vars.aPiggyFlags4OnError2 = [];

/**
 * This array stores success flags associated with the pullback attempts
 *
 * @id 20190329°0431
 * @see todo 20190401°0523 'combine piggy variables'
 * @note Not yet used, isn't it?
 */
Cvgr.Vars.aPiggyFlags4OnLoad1 = [];

/**
 * This array stores success flags associated with the pullback attempts
 *
 * @id 20190329°0432
 * @see todo 20190401°0523 'combine piggy variables'
 * @note Not yet used, isn't it?
 */
Cvgr.Vars.aPiggyFlags4OnError1 = [];

/**
 * This are the flags for the second pull-behind attempt
 *
 * @id 
 * @see todo 20190401°0523 'combine piggy variables'
 */
Cvgr.Vars.aPiggyIconArrays = [];

/**
 * This array stores the timers to examine the non-immediate algorithms
 *
 * @id 20190329°0433
 * @see todo 20190401°0523 'combine piggy variables'
 */
Cvgr.Vars.aPiggyTimers = [];

// helper variables for browser independend angle calculation
Cvgr.Vars.iFramesInLastTwoSeconds = 0;                 // [var 20140815°0934]
Cvgr.Vars.iFramesPerTowSeconds = 0;                    // [var 20140815°0935]
Cvgr.Vars.iMarkLastTwoSecond = 0;                      // [var 20140815°0932]
Cvgr.Vars.iMarkLastTwoSecondFrame = 0;                 // [var 20140815°0933]
Cvgr.Vars.nIncTurnsPerFrame = 0;                       // [var 20140815°0937] increment turns per frame for 1 Hz
Cvgr.Vars.nTrueAngleTurns = 0;                         // [var 20140815°0936] wanted browser independend angle in turns for 1 Hz

Cvgr.Vars.sDebugPageHelper = ''; // [var 20190330°0411]

Cvgr.Vars.tHelper = null; // [var 20190401°1413]

/**
 * This function is called when pulling-behind a non-immediate algorithm, it
 *  examines success, and in case of failure cares for a replacement algorithm.
 *
 * This is some late quality control, because I do not (yet) trust the
 *  onload and onerror event handlers. All what is known and done here, should
 *  already have been known and done in either onload or onerror event handler.
 *
 * @id 20190329°0451
 * @todo 20190330°0441 : The two parameters iNdxPiggy and iko seem
 *     redundant, one of them should suffice. Does it`?
 * @param {Integer} iNdxPiggy — The index into the piggy arrays
 * @param {object} iko — The specific Ikon which's algo shall be examined
 */
Cvgr.Func.examineAlgo = function(iNdxPiggy, iko)
{

   // is algorithm available now? [condi 20190329°0453]
   var sAlgoNameOrg = iko.AlgoName;
   if ( iko.AlgoName in Cvgr.Algos ) {
      Cvgr.Vars.aPiggyFlags4Avail[iNdxPiggy] = true;
   }
   else {
      // rider not found [seq 20190331°0345]
      // note : This is identical with seq 20190331°0343, it should be superfluous
      var aIcos = Cvgr.Vars.aPiggyIconArrays[iNdxPiggy];
      for (var i = 0; i < aIcos.length; i++) {
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].AlgoName = 'pulse';
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].CmdsHash['text'] = ('Rpx ' + i);
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].iFrameDelay = Cvgr.Vars.iFrameNo - 1;
         Cvgr.Func.initializeCanvas(Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i]);
      }
   }

   // debug output
   Cvgr.Vars.sDebugPageHelper += '<br /> — examineAlgo :' + ' piggy ' + iNdxPiggy + ' &nbsp;'
                       + ' onLoad = ' + Cvgr.Vars.aPiggyFlags4OnLoad1[iNdxPiggy] + ' &nbsp;'
                        + ' onError1 = ' + Cvgr.Vars.aPiggyFlags4OnError1[iNdxPiggy] + ' &nbsp;'
                         + ' onError2 = ' + Cvgr.Vars.aPiggyFlags4OnError2[iNdxPiggy] + ' &nbsp;'
                          + ' avail = ' + Cvgr.Vars.aPiggyFlags4Avail[iNdxPiggy] + ' &nbsp;'
                           + ' algo = ' + sAlgoNameOrg + ' / ' + iko.AlgoName
                            ;
};

/**
 * This function prints to the Cvgr_CanvasAttachedInfoPara field
 *
 * @id 20190329°0921
 * @callers Only • executeFrame()
 * @param {Integer} iNdx
 */
Cvgr.Func.executeFram_PrintInfoCanvas = function(iNdx)
{
   // (x) output canvas status [seq 20140815°1251]
   // The ID of the output element has to be the ID of the canvas with added '.info'.
   // See ref 20190329°0513 'stackoverflow : convert float number to whole'
   var sIde = Cvgr.Vars.icos[iNdx].Ide + '.info'; // Cvgr_CanvasAttachedInfoPara
   var el = document.getElementById(sIde);
   if (el !== null)
   {
      // prepare print variable [seq 20140815°1311]
      var sOut = '<small>Canvas Debug Info :';

      // print fixed value set [seq 20140815°1313]
      sOut += "<br />iko.AlgoName = " + Cvgr.Vars.icos[iNdx].AlgoName + ' '
            + "<br />frame no = " + Cvgr.Vars.iFrameNo + ' '
            + "<br />iko.Angle = " + Cvgr.Vars.icos[iNdx].Angle.toFixed(9) + ' '
             +  "<br />iko.Color = " + Cvgr.Vars.icos[iNdx].Color
              + "<br />iko.Height = " + Cvgr.Vars.icos[iNdx].Height
               + "<br />iko.Mode = " + (Cvgr.Vars.bFlagTipTopTest ? 'Top' : 'Tip')
                + "<br />iko.Width = " + Cvgr.Vars.icos[iNdx].Width
                 ;

      // print commandline args [seq 20140815°1315]
      for ( var ki in Cvgr.Vars.icos[iNdx].CmdsHash )
      {
         var sValEscaped = Trekta.Utils.htmlEscape(Cvgr.Vars.icos[iNdx].CmdsHash[ki]);
         sOut += "<br /> [cmd] " + ki + " = " + sValEscaped;
      }

      // finish printing [seq 20140815°1317]
      sOut += "</small>";
      el.innerHTML = sOut;
   }
};

/**
 * This function prints to the page debug info
 *
 * @id 20190329°0931
 * @callers Only • executeFrame()
 */
Cvgr.Func.executeFram_PrintInfoPage = function ( iTimeCurr
                                                , iElapsedTwoSeconds
                                                 , iFramesPerSecondTotal
                                                  )
{
   // (.4) output Page Debug Info [seq 20140916°1032]
   var elDbg = document.getElementById("Cvgr_DebugPageOutputArea");
   if (elDbg !== null)
   {
      var s = "<b>CanvasGear Page Debug Info</b> :";
      s += " AlgoMode = " + (Cvgr.Vars.bFlagTipTopTest ? 'Top' : 'Tip') + "; ";
      s += " Frame number = " + Cvgr.Vars.iFrameNo + ";";
      s += "<br />Start time = " + Cvgr.Vars.iTimeStart + " = " + Cvgr.Vars.iTimeStart.valueOf() + ";";
      s += "<br />Current time = " + iTimeCurr;
      s += "<br />Elapsed seconds (every two) = " + iElapsedTwoSeconds + ";";
      s += "<br />Frames per seconds (total, average since start) = " + iFramesPerSecondTotal.toFixed(9);
      s += "<br />Frames per seconds (for the last two seconds) = " + Cvgr.Vars.iFramesPerTowSeconds.toFixed(9);
      s += "<br />True angle for 1 Hz (turns) = " + Cvgr.Vars.nTrueAngleTurns.toFixed(9) + ";";
      s += "<br />Increment per frame (turns) = " + Cvgr.Vars.nIncTurnsPerFrame.toFixed(9) + ";";
      s += "<br />" + Cvgr.Vars.sDebugPageHelper;
      elDbg.innerHTML = s;
   }
};

/**
 * This function performs the continuous drawing
 *
 * @id 20140815°1221
 * @callers • once from function Cvgr.startCanvasGear()
 *           • then periodically via requestAnimFrame()
 */
Cvgr.Func.executeFrame = function()
{

   // (P) output page status [seq 20140815°1247]
   // (P.1) calculate each frame [seq 20140815°1252]
   Cvgr.Vars.iFrameNo++;
   var iTimeCurr = new Date();
   iTimeCurr.getTime();
   var iElapsedMs = iTimeCurr - Cvgr.Vars.iTimeStart;
   var iFramesPerSecondTotal = Cvgr.Vars.iFrameNo / iElapsedMs * 1000;
   var iElapsedTwoSeconds = Math.floor( iElapsedMs / 2000 ) * 2;

   // (P.2) perform periodic measurment [seq 20140815°1253]
   if ( Cvgr.Vars.iMarkLastTwoSecond < iElapsedTwoSeconds )
   {
      Cvgr.Vars.iMarkLastTwoSecond = iElapsedTwoSeconds;
      Cvgr.Vars.iFramesInLastTwoSeconds = Cvgr.Vars.iFrameNo - Cvgr.Vars.iMarkLastTwoSecondFrame;
      Cvgr.Vars.iFramesPerTowSeconds = (Cvgr.Vars.iFrameNo - Cvgr.Vars.iMarkLastTwoSecondFrame) / 2;
      Cvgr.Vars.iMarkLastTwoSecondFrame = Cvgr.Vars.iFrameNo;
   }

   // (P.3) calculate true angle
   // (P.3.1) handle border situation [seq 20140815°1254]
   // On start no two-second measurement does exist, so use the first available
   //  value. This is imprecise, sometime half, sometime double the final value.
   if (Cvgr.Vars.iFramesPerTowSeconds < 0.001)
   {
      Cvgr.Vars.iFramesPerTowSeconds = iFramesPerSecondTotal * 2;
   }

   // (P.3.2) calculate increment per frame [seq 20140815°1255]
   // Remember note 20140916°1031 'known cornerstone values'
   Cvgr.Vars.nTrueAngleTurns = Cvgr.Vars.nTrueAngleTurns + (1 / Cvgr.Vars.iFramesPerTowSeconds);
   if (Cvgr.Vars.nTrueAngleTurns > 1)
   {
      Cvgr.Vars.nTrueAngleTurns = Cvgr.Vars.nTrueAngleTurns - 1;
   }
   Cvgr.Vars.nIncTurnsPerFrame = 1 / Cvgr.Vars.iFramesPerTowSeconds;

   // (P.4) debug output page status [line 20190329°0933] Cvgr_DebugPageOutputArea
   Cvgr.Func.executeFram_PrintInfoPage ( iTimeCurr
                                        , iElapsedTwoSeconds
                                         , iFramesPerSecondTotal
                                          );
   
   // process each Ikon on the page [seq 20140815°1256]
   for (var iNdx = 0; iNdx < Cvgr.Vars.icos.length; iNdx++)
   {
      // convenience [seq 20190330°0327]
      var iko = Cvgr.Vars.icos[iNdx];

      if ( iko.AlgoName === 'Template' ) {
         var sAlgo = sAlgo;
      }

      // process DrawNumberLimit flag [seq 20190401°0431]
      // Remeber issue 20190401°0435 'hamster appears multiple times'
      // Remember finding 20190401°0451 'frame delay with pulled-behind canvases'
      if ( ( ! iko.DrawNumberLimit < 1 )
          && ( ( Cvgr.Vars.iFrameNo - iko.iFrameDelay ) > iko.DrawNumberLimit )
           ) {
         continue;
      }

      // () debug output canvas status [line 20190329°0923]
      Cvgr.Func.executeFram_PrintInfoCanvas(iNdx);

      // () execute algorithm [seq 20140815°1257]
      //  Remember issue 20140828°0751 'Algo calling params quirk' — is it solved?
      // (.1) convenience
      var sAlgo = iko.AlgoName;

      // (.2) [condition 20190329°0411]
      // note : The condition got tricky with feature 20190330°0141 'external algo
      //  overwrites built-in one'. Before, it was plain "if (sAlgo in Cvgr.Algos)".
      if ( ( (sAlgo in Cvgr.Algos) && ( (sAlgo !== 'Template') || Cvgr.Vars.bTemplateSearchFinished ) )
          || ( iko.bIsDefaultSettingDone )
           )
      {
         // (2.1) immediate call [seq 20190329°0413]
         if ( ! iko.bIsDefaultSettingDone ) {
            Cvgr.Func.initializeCanvas(iko); // initialize icon
         }
         try {
            // execute icon
            Cvgr.Algos[sAlgo].executeAlgorithm(iko);
         } catch(err) {
            // it is e.g. the non-existent 'Oha' algorithm, note yet
            //  exchanged to the default algo. Just skip this.
            Cvgr.Vars.sDebugPageHelper += '<br />↯ executeAlgorithm failed:'
                            + 'Ide = ' + iko.Ide + ' algo = ' + sAlgo
                             + ' (should never happen'
                              ;
         }
      }
      else
      {
         // the wanted algorithm is *not* present in canvasgear.js itself

         // (2.2) try loading algo
         // (2.2.1) was this algo already processed? [seq 20190330°0343]
         var iNdxPiggy = Cvgr.Vars.aPiggyAlgoNames.indexOf(sAlgo);
         if ( iNdxPiggy >= 0 ) {
            // pull-behind requests are only done in the first round [condition 20190330°0431]
            if (Cvgr.Vars.iFrameNo < 2 ) {
               Cvgr.Vars.aPiggyIconArrays[iNdxPiggy].push(iko);
            }
            continue;
         }

         // () paranoia — prefabricated callback on stock? [seq 20190331°0611]
         if (Cvgr.Vars.aPiggyAlgoNames.length > (Cvgr.Vars.aPiggyCallbacks.length - 1)) {
            // No more prefabricated callback, immediately assign substitution algorithm
            Cvgr.Vars.sDebugPageHelper += '<br />*** Prefabricated callbacks finished : ' + Cvgr.Vars.aPiggyAlgoNames.length;

            iko.AlgoName = 'pulse';
            iko.CmdsHash['text'] = ('Substitute');
            continue;
         }

         // (2.2.2) load buddy module [seq 20190329°0415]
         var sPathAbs = Trekta.Utils.retrieveScriptFolderAbs('canvasgear.combined.js'); // e.g. "http://localhost/canvasgear/"
         if (sPathAbs === '') { // supplement 20190402°0451
            sPathAbs = Trekta.Utils.retrieveScriptFolderAbs('canvasgear.js');
         }
         var sModuleNameOne = sPathAbs + 'riders/canvasgear.' + sAlgo + '.js';
         var sModuleNameTwo = sPathAbs + 'canvasgear.' + sAlgo + '.js';
         var iModuleIndex = Cvgr.Vars.aPiggyAlgoNames.length;

         // create piggy array set [seq 20190330°0344]
         // This helps to solve issue 20190330°0331 'pull-behind only per algo'
         // See todo 20190401°0523 'combine piggy variables'
         Cvgr.Vars.aPiggyAlgoNames.push(sAlgo);
         var ar = [];
         ar.push(iko);
         Cvgr.Vars.aPiggyIconArrays.push(ar);
         Cvgr.Vars.aPiggyFlags4Avail.push(false);
         Cvgr.Vars.aPiggyFlags4OnError2.push(false);
         Cvgr.Vars.aPiggyFlags4OnLoad1.push(false);
         Cvgr.Vars.aPiggyFlags4OnError1.push(false);
         Cvgr.Vars.aPiggyTimers.push ( setTimeout ( Cvgr.Func.examineAlgo
                                      , 1444                           // to be tuned
                                       , Cvgr.Vars.aPiggyTimers.length // index into the piggy arrays
                                        , Cvgr.Vars.icos[iNdx]         // why this?
                                         ));
         Cvgr.Vars.aPiggyModuleNamesTwo.push(sModuleNameTwo);

         // output debug message [line 20190330°0416]
         Cvgr.Vars.sDebugPageHelper += '<br /> — pullScriptBehind ' + iModuleIndex + ' ' + sAlgo;

         // try loading the wanted script [line 20190330°0417]
         // Heureka, with the hardcoded callback stockpile, the parameters work individually
         // Remember brute force debug issue 20190330°0355 'callback parameter useless'
         Trekta.Utils.pullScriptBehind ( sModuleNameOne
                                        , Cvgr.Vars.aPiggyCallbacks[iModuleIndex][0]
                                         , Cvgr.Vars.aPiggyCallbacks[iModuleIndex][1]
                                          );
      } // immediate-versus-load condition finished
   } // single canvas processing finished

   // setup for animation [line 20140815°1258]
   window.requestAnimFrame(Cvgr.Func.executeFrame);
};

/**
 * This function sets the algorithm properties, reading first the built-in
 *  default values, then overwriting them with the commandline values
 *
 * @id 20190330°0241
 * @note ref 20140926°0352 'Stackoverflow : Check key in object'
 * @note ref 20140926°0351 'Stacko : For-each on array'
 * @note ref 20111031°1322 'Harms & Diaz : JavaScript object oriented ...'
 * @see note 20190329°1043 'the icon properties so far'
 * @callers Two places •• each before Cvgr.Algos[sAlgo].executeAlgorithm
 * @param {Object} iko — The Ikon to be processed
 */
Cvgr.Func.initializeCanvas = function(iko)
{
   // (A) process properties [seq 20190330°0311]
   // (A.) translate tokens to property names [seq 20190330°0313]
   var oTokToProp = {
      algo : 'AlgoName'
      , bgcolor : 'BgColor'
      , color : 'Color'
      , color2 : 'Color2'
      , color3 : 'Color3'
      , height : 'Height'
      , hertz : 'Hertz'
      , shiftx : 'ShiftX'
      , shifty : 'ShiftY'
      , width : 'Width'
   };

   // (A.) get possible default properties [line 20190330°0242]
   // About JavaScript syntax — Curiously, here it causes no error, if the
   //  algorithm namespace has no defaultProperties defined, not even in IE9.
   var oDefaults = Cvgr.Algos[iko.AlgoName].defaultProperties;

   // (A.) first apply default values to Ikon object [line 20190330°0243]
   for (var sKey in oDefaults) {
      iko[sKey] = oDefaults[sKey];
   }

   // (A.) then overwrite with commandline values [seq 20190330°0244]
   for ( var sKeySrc in iko.CmdsHash) {

      // (A.) do not restore the algo name [seq 20190331°0321]
      //  Any not-found algo might have switched it to default algo ('pulse')
      if (sKeySrc === 'algo') {
         continue;
      }

      // (A.) translate [seq 20190330°0245]
      var sKeyTgt = sKeySrc;
      if (sKeySrc in oTokToProp) {
         sKeyTgt = oTokToProp[sKeySrc];
      }

      // (A.) write [seq 20190330°0246]
      iko[sKeyTgt] = iko.CmdsHash[sKeySrc];
   }

   // (B) process events [seq 20190401°0911]
   // todo 20190401°1233 : Alternatively use addEventListener like
   //   "document.addEventListener('mousemove', onMouseMove);"
   var sAlgo = iko.AlgoName;
   if ( 'pickupOnKeyDown' in Cvgr.Algos[sAlgo]) {
      document.onkeydown = Cvgr.Algos[sAlgo].pickupOnKeyDown;
   }
   if ( 'pickupOnMouseMove' in Cvgr.Algos[sAlgo]) {
      iko.Canvas.onmousemove = Cvgr.Algos[sAlgo].pickupOnMouseMove;
   }
   if ( 'pickupOnMouseDown' in Cvgr.Algos[sAlgo]) {
      iko.Canvas.onmousedown = Cvgr.Algos[sAlgo].pickupOnMouseDown;
   }
   if ( 'pickupOnMouseUp' in Cvgr.Algos[sAlgo]) {
      iko.Canvas.onmouseup = Cvgr.Algos[sAlgo].pickupOnMouseUp;
   }
   if ( 'pickupOnTouchMove' in Cvgr.Algos[sAlgo]) {
      iko.Canvas.ontouchmove = Cvgr.Algos[sAlgo].pickupOnTouchMove;
   }
   if ( 'pickupOnTouchStart' in Cvgr.Algos[sAlgo]) {
      iko.Canvas.ontouchstart = Cvgr.Algos[sAlgo].pickupOnTouchStart;
   }

   // (C) process sound [seq 20190401°1323]
   if (iko.PlaySound === 'yes') {

      // load [seq 20190401°1325]
      Cvgr.Vars.bSoundLibraryLoading = true;

      // seq 20190402°0521
      var sScript = Trekta.Utils.retrieveScriptFolderAbs('canvasgear.combined.js');
      if (sScript === '') { sScript = Trekta.Utils.retrieveScriptFolderAbs('canvasgear.js'); }
      sScript += 'libs/howler/howler.min.js';
      Trekta.Utils.pullScriptBehind ( sScript
                                     , Cvgr.Func.pullbehind_soundOnLoad('howler')
                                      , Cvgr.Func.pullbehind_soundOnError('howler')
                                       );
   }

   // (D) set signal [line 20190330°0344]
   iko.bIsDefaultSettingDone = true;
};

/**
 * This function is an event handler for the script onerror event.
 *   It is possibly called after wanted script pulled-behind failed.
 *
 * @id 20190331°0251
 * @note This code shall be pretty similar to func 20190329°0451 examineAlgo
 * @todo Check — Having the error feedback now, might make function examineAlgo superfluous.
 * @see ref 20190331°0238 'stackoverflow: tell if script faild to load'
 * @callers Only • pullScriptBehind callback
 */
Cvgr.Func.pullbehind_onError = function(iNdxPiggy)
{
   if ( Cvgr.Vars.aPiggyAlgoNames[iNdxPiggy] === 'Template' ) {
      var xDbg = xDbg;
   }

   // was the second attempt already done? [condition 20190329°0434]
   if ( Cvgr.Vars.aPiggyFlags4OnError1[iNdxPiggy] === false ) {

      // pullbehind second attempt [line 20190331°0413]
      // See feature 20190331°0411 'rider scripts in two folders'
      Cvgr.Vars.aPiggyFlags4OnError1[iNdxPiggy] = true;
      Trekta.Utils.pullScriptBehind ( Cvgr.Vars.aPiggyModuleNamesTwo[iNdxPiggy]
                                     , Cvgr.Vars.aPiggyCallbacks[iNdxPiggy][0] // [2]
                                      , Cvgr.Vars.aPiggyCallbacks[iNdxPiggy][1] // [3]
                                       );
      Cvgr.Vars.sDebugPageHelper += '<br /> — pullScript_Second :'
                     + ' &nbsp; piggy ' + iNdxPiggy
                      + ' &nbsp; "' + Cvgr.Vars.aPiggyAlgoNames[iNdxPiggy] + '"'
                       + ' &nbsp; onload = ' + Cvgr.Vars.aPiggyFlags4OnLoad1[iNdxPiggy]
                        + ' &nbsp; onerror1 = ' + Cvgr.Vars.aPiggyFlags4OnError1[iNdxPiggy]
                         + ' &nbsp; onerror2 = ' + Cvgr.Vars.aPiggyFlags4OnError2[iNdxPiggy]
                          ;
      return;
   }

   // main job [line 20190331°0253]
   Cvgr.Vars.aPiggyFlags4OnError2[iNdxPiggy] = true;

   // is algorithm available now? [condi 20190329°0453]
   if ( Cvgr.Vars.aPiggyAlgoNames[iNdxPiggy] in Cvgr.Algos ) {

      // [seq 20190331°0333]
      Cvgr.Vars.bTemplateSearchFinished = true;
      Cvgr.Vars.aPiggyFlags4Avail[iNdxPiggy] = true;

      // this should be the run only by 'Template', does it? [seq 20190401°0531]
      // So far, only Template is searched external, although it were available internal.
      // todo : Sequence is redundant with just below. Somehow merge the two.
      var aIcos = Cvgr.Vars.aPiggyIconArrays[iNdxPiggy];
      for (var i = 0; i < aIcos.length; i++) {
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].CmdsHash['text'] = ('Template intern ' + i);
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].iFrameDelay = Cvgr.Vars.iFrameNo - 1;
         Cvgr.Func.initializeCanvas(Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i]);
      }
   }
   else {
      // rider not found, switch to default algo [seq 20190331°0343 (like 20190331°0345)]
      // loop over this canvases
      var aIcos = Cvgr.Vars.aPiggyIconArrays[iNdxPiggy];
      for (var i = 0; i < aIcos.length; i++) {
         // switch this canvas to substitute algo
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].AlgoName = 'pulse';
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].CmdsHash['text'] = ('Rp ' + i);
         Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i].iFrameDelay = Cvgr.Vars.iFrameNo - 1;
         Cvgr.Func.initializeCanvas(Cvgr.Vars.aPiggyIconArrays[iNdxPiggy][i]);
      }
   }

   // debug output [seq 20190331°0255]
   Cvgr.Vars.sDebugPageHelper += '<br /> — pullbehind_onError :'
                     + ' &nbsp; piggy ' + iNdxPiggy
                      + ' &nbsp; "' + Cvgr.Vars.aPiggyAlgoNames[iNdxPiggy] + '"'
                       + ' &nbsp; onload = ' + Cvgr.Vars.aPiggyFlags4OnLoad1[iNdxPiggy]
                        + ' &nbsp; onerror1 = ' + Cvgr.Vars.aPiggyFlags4OnError1[iNdxPiggy]
                         + ' &nbsp; onerror2 = ' + Cvgr.Vars.aPiggyFlags4OnError2[iNdxPiggy]
                          ;
};

/**
 * This function is called only after wanted script was pulled-behind
 *
 * @id 20190329°0211
 * @note Remember issue 20190330°0355 'callback parameter useless'
 * @note Curiously, the program works pretty well also without this
 *    function here. Does it really? Why? Is this function superfluous?
 * @callers Only • pullScriptBehind callback
 */
Cvgr.Func.pullbehind_onLoad = function(iNdxPiggy)
{
   // main job [line 20190331°0323]
   Cvgr.Vars.aPiggyFlags4OnLoad1[iNdxPiggy] = true;

   // fulfill [seq 20190330°0345] issue 20190330°0331 'pull-behind only per algo'
   var sAlgoNam = Cvgr.Vars.aPiggyAlgoNames[iNdxPiggy];
   Cvgr.Vars.sDebugPageHelper += '<br /> — pullbehind_onLoad : piggy ' + iNdxPiggy;

   // [seq 20190330°0433]
   var aIcos = Cvgr.Vars.aPiggyIconArrays[iNdxPiggy];
   Cvgr.Vars.sDebugPageHelper += ' &nbsp; algo "' + aIcos[0].AlgoName
                               + '" &nbsp; count = ' + aIcos.length
                                ;

   // process all icons of this one algorithm [seq 20190330°0435]
   for (var i = 0; i < aIcos.length; i++) {

      // convenience [line 20190330°0437]
      var iko = aIcos[i];
      Cvgr.Vars.sDebugPageHelper += '<br /> — &nbsp; &nbsp; &nbsp; &nbsp; iko.Ide = ' + iko.Ide;

      // the algo might be not yet ready [condi 20190329°0213]
      // note : With the both requestAnimFrame plus pullScriptBehind
      //    intertweened, the exact callings may get a bit complicated.
      if (sAlgoNam in Cvgr.Algos) {
         // finally do the wanted algo [line 20190329°0215]
         if ( ! iko.bIsDefaultSettingDone ) {
            Cvgr.Func.initializeCanvas(iko);
         }
         iko.iFrameDelay = Cvgr.Vars.iFrameNo - 1;
         Cvgr.Algos[iko.AlgoName].executeAlgorithm(iko);
      }
   }
};

/**
 * This function is an event handler for the script onerror event
 *
 * @id 20190401°1333
 * @note The SoundManager2 pullbehind does not use the events for the
 *    algorithm pullbehinds because here we hopefully stay much simpler.
 *    It will be interesting, if we possible want load even more scripts,
 *    whether it is easy to share this callback with multiple of them.
 * @callers Only • pullScriptBehind callback
 * @param {String} sScript The name of the script to load. This is, what
 *    will be interesting, whether it will be easy to share this callback
 *    between multiple scripts.
 */
Cvgr.Func.pullbehind_soundOnError = function(sScript)
{
   // [seq 20190401°1334]
   if ( (sScript !== 'soundman2') && (sScript !== 'howler') ) {
      alert('Theoretically not possible:\n\nPullbehind onError wanted = "' + sScript + '"');
      return;
   }

   // [line 20190401°1335]
   Cvgr.Vars.bSoundLibraryFailed = true;

};

/**
 * This function is an event handler for the script onload event
 *
 * @id 20190401°1343
 * @callers Only • pullScriptBehind callback
 */
Cvgr.Func.pullbehind_soundOnLoad = function(sScript)
{
   // [seq 20190401°1344]
   if ( (sScript !== 'soundman2') && (sScript !== 'howler') ) {
      alert('Theoretically not possible:\n\nPullbehind onLoad wanted = "' + sScript + '"');
      return;
   }

   // [line 20190401°1345]
   Cvgr.Vars.bSoundLibraryLoaded = true;

   // workaround [seq 20190401°1348]
   // Curiously, here in this event handler, the loaded script seems
   //  not yet available, but in the continuatino function it will be.  
   Cvgr.Vars.tHelper = setTimeout(Cvgr.Func.pullbehind_soundOnLoaded, 1456);
};

/**
 * This function is a workaround for issue 20190401°1347 'loaded script not available ..'
 *
 * @id 20190401°1353
 * @see issue 20190401°1347 'loaded script not available in onLoad callback'
 * @see finding 20190401°1433 'summary on SoundManager2 so far'
 * @callers Only • pullScriptBehind callback
 */
Cvgr.Func.pullbehind_soundOnLoaded = function()
{
   // prepare source string [seq 20190402°0543]
   // See issue 20190402°0611 'audio data source does not work'
   var sAudioData = '4';
   switch (sAudioData) {
      case '1' : sAudioData = Cvgr.Const.sB64Dopiaza_Bonk_Mp3; break;  // not so loud
      case '2' : sAudioData = Cvgr.Const.sB64Dopiaza_Fingerplop2_Mp3; break; // a bit higher
      case '3' : sAudioData = Cvgr.Const.sB64Dopiaza_Fingerplop_Mp3; break; // a bit lower
      case '4' : sAudioData = Cvgr.Const.sB64Dopiaza_MouseOverMp3; break; // ringing
      default : sAudioData = './../libs/sm2/mouseover.mp3'; // possibly not available with canvasgear.combined.js
   }

   // [line 20190402°0541 (after 20190402°0221)]
   // note : Line after ref 20190401°1616 https://github.com/goldfire/howler.js/
   // note : The recommendation is to put the file in several formats, so Howlser
   //    can choose which fits for the browser, but we found the mp3 serves all
   Cvgr.Vars.sound = new Howl ({
                     src : [ ( sAudioData ) ] // one format only
                     , loop : false
                      });

   // finally set flag [line 20190401°1359]
   Cvgr.Vars.bSoundLibraryReady = true;
};

/**
 * This function constitutes the radiobuttons 'onClick' event handler
 *
 * @id 20140819°1751
 * @status Dummy function
 * @callers This is called when selecting a radiobutton
 */
Cvgr.Func.setRadiobutton = function()
{
   // toggle [seq 20140819°1753]
   var sMsg = '[Debug 20140926°1131]\n\nNow radio-button algo-mode = ';
   if (document.FormAlgoMode.AlgoMode[0].checked)
   {
      Cvgr.Vars.bFlagTipTopTest = false;
      sMsg += document.FormAlgoMode.AlgoMode[0].value;
   }
   else
   {
      Cvgr.Vars.bFlagTipTopTest = true;
      sMsg += document.FormAlgoMode.AlgoMode[1].value;
   }

   // debuge [seq 20140819°1755]
   if ( Cvgr.Const.bShow_Debug_Dialogs )
   {
      alert(sMsg);
   }

   return;
};

﻿/** - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This section provides algorithm 'Ballist'
 *
 * id 20140916°0411 namespace
 * version : 0.x.x — 20190330°0757..
 * license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 * copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
 * authors : ncm
 * encoding : UTF-8-with-BOM
 */

// Formal integration into main script [seq 20190329°0621`xx]
var Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};

/**
 * This namespace holds the Ballist algorithm
 * (This is built-in but planned to be extracted to a rider script)
 *
 * @id 20180619°0121
 */
Cvgr.Algos.Ballist = {

   /*
    * This function provides a hit object for the Ballist algorithm
    *
    * @id 20140916°0741
    * @param nRingval {}
    * @param nMinutes {}
    */
   Hit : function(nRingval, nMinutes) { // Cvgr.Algos.Ballist.Hit

      'use strict'; // [line 20190329°0843`14]

      // set source values
      this.ringval = nRingval;                            // number - the ring value (assumed from 1.0 to 10.9)
      this.minutes = nMinutes;                            // number - which minute on the clock

      // calculate cartesian coordinates
      var angle = this.minutes / 60 * Math.PI * 2;        // preliminary guess
      angle = angle + Math.PI * 1.5;                      // shift the 0-Minute from east position to north position

      // invert ring to radius
      // note 20140917°0311 : The final coordinates can only be calculated
      //    if the size of the target and the size of the canvas is known.
      var nRadi = 10.9 - this.ringval;                    // invert ring value to a radius number
      // //nRadi = nRadi * 0.2;                           // they calc from 1 to 10, we need from 1.1 to 10.9

      var nEmpricHelper = 0.20;
      var x = nRadi * Math.cos(angle) * nEmpricHelper;    // ELIMINATE empirical factor
      var y = nRadi * Math.sin(angle) * nEmpricHelper;    // ELIMINATE empirical factor

      this.X = x;                                         // number - calculated
      this.Y = y;                                         // number - calculated
   }

   /**
    * This class provides a ring object for the Ballist algorithm
    *
    * @id 20140815°1341 [[20140815°1221]]
    * @param sRingName {}
    * @param nRadiusAbs {}
    * @param sColorRing {}
    * @param sColorSpace {}
    */
   , Ring : function(sRingName, nRadiusAbs, sColorRing, sColorSpace ) { // Cvgr.Algos.Ballist.Ring

      'use strict';

      // guarantee default values [seq 20140815°1343]
      // note : not sure this sequence yet works properly
      if (sRingName === null) {
         sRingName ='?';
      }
      if (nRadiusAbs === null) {
         nRadiusAbs = 0.987;
      }
      if (sColorRing === null) {
         sColorRing = 'gray';
      }
      if (sColorSpace === null) {
         sColorSpace = 'white';
      }

      // set public properties [seq 20140815°1345]
      this.ringname = sRingName;                                       // string e.g. '1', '2', ..
      this.radiusAbs = nRadiusAbs;                                     // number - radius absolute in meter
      this.colorRing = sColorRing;                                     // string - color of the ring, RGB or webcolor
      this.colorSpace = sColorSpace;                                   // string - color of the space for the ring RGB or webcolor
   }

   /*
    * This class provides a target object for the Ballist algorithm
    *
    * @id 20140916°0911
    * @param nRadius {} The target's radius in m, usually goes with lowest ring.
    */
   , Target : function() { // Cvgr.Algos.Ballist.Target

      'use strict';

      // [seq 20140916°0913]
      this.Diameter = 0.1;                                             // diameter in meter [var 20140926°1151] the canvas scale shall be based on this
      this.Naame = '<n/a>';                                            // the discipline name
      this.Shortnam = '<n/a>';                                         //
      this.rings = new Array();                                        // array of rings, to be filled by somebody
   }

   /**
    * This function .. is a test function
    *
    * @id 20140926°1211
    * @callers Only • func 20140916°0421 executeAlgorithm
    * @param {object} iko ...
    */
   , executeAlgo_drawDiagonal : function(iko) // Cvgr.Algos.Ballist.executeAlgo_drawDiagonal
   {
      'use strict'; // [line 20190329°0843`16]

      // preparation [seq 20140926°1212]
      var nHeight = iko.Height;                           // pixel — remember issue 20140901°0933 'Opera 10 peculiar about capitals'
      var nWidth = iko.Width;                             // pixel
      var nDist1 = 11;                                    // distance to the canvas border in pixel
      var nDistTwo = nDist1 / 2;                          // half distance

      // scale endpoints [seq 20140926°1213]
      var nX1 = nDist1;
      var nY1 = nHeight - nDist1;
      var nX2 = nWidth - nDist1;
      var nY2 = nHeight - nDist1;

      // draw [seq 20140926°1221]
      // note : Sequence written after sequence in Cvgr.Func.algoTriangle().
      iko.Context.beginPath();

      // do bulk work [seq 20140926°1214]
      // Remember issue 20140901°0933 'Opera 10 peculiar about capitals'
      iko.Context.moveTo(nX1, nY1);
      iko.Context.lineTo(nX2, nY2);

      iko.Context.moveTo(nX1, nY2 + nDistTwo);
      iko.Context.lineTo(nX1, nY2 - nDistTwo);

      iko.Context.moveTo(nX2, nY2 + nDistTwo);
      iko.Context.lineTo(nX2, nY2 - nDistTwo);

      iko.Context.strokeStyle = iko.Color;                             // ?
      iko.Context.fillStyle = iko.Color;
      iko.Context.fill();

      iko.Context.closePath();

      iko.Context.strokeStyle = 'turquoise';                           // 'lightgreen'
      iko.Context.lineWidth = 3;
      iko.Context.stroke();

      // add ruler part one [seq 20140926°1215]
      var s = "~0.11 m";
      iko.Context.font = "1.2em Arial";                                // e.g. "20px Times Roman", "1.2em Arial", "bold 14px verdana, sans-serif"
      iko.Context.fillStyle = "turquoise";                             // "aquamarine" // "#ff0000"
      iko.Context.fillText(s, nX1 + nDistTwo, nY1 - nDistTwo);         // IE8 Error 'Object doesn't support this property or method' (see issue 20160416°1321)

      // add ruler part two [seq 20140926°1216 parent]
      // note : Remember issue 20140926°1321 'IE8 fails with Context.fillText' finished
      // do : todo 20140926°1341 'provide writeText method'
      // Compare seq 20190331°0521 'write text'
      if (iko.CmdsHash['text']) {
         iko.Context.fillStyle = "#102030";
         iko.Context.font = "1.2em Arial";                     // e.g. "20px Times Roman", "1.2em Arial"
         iko.Context.fillText(iko.CmdsHash['text'], 10, 20);   // e.g. "Hello.."
      }
   }

   /**
    * This function .. is a private helper function
    * @id 20140926°0911
    * @status
    * @callers Only Cvgr.Algos.Ballist.executeAlgorithm
    * @param sSeries {} ..
    */
   , executeAlgo_getSeries : function(sSeries) // Cvgr.Algos.Ballist.executeAlgo_getSeries
   {
      'use strict'; // [line 20190329°0843`17]

      var hits = new Array();

      if (( typeof sSeries === 'undefined' ) || (sSeries.length < 1)) {

         // hardcoded default hitlist [seq 20140916°0751]
         var h = new Cvgr.Algos.Ballist.Hit(10.7, 55); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(9.3, 43); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.1, 0); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.2, 1); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.3, 3); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.4, 6); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.5, 10); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.6, 20); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.7, 30); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.8, 40); hits.push(h);
         var h = new Cvgr.Algos.Ballist.Hit(2.9, 50); hits.push(h);

         // retrieve series details ring-decimal/minutes-on-clock
         // Commandlines e.g.:
         //   - algo=Ballist series="10.7/55 9.3/43 8.5/39 6.2/43 3.3/33 1.0/11" id="i20140916o0731"
         //   - <!-- algo=Ballist series="9.3/43 8.5/39 8.0/45 8.9/51 8.5/56 9.7/29 9.9/27 8.5/17 8.3/42 6.3/43 9.7/1 9.9/45 9.8/47 7.8/41 6.2/43 10.0/16 10.2/44 9.8/7 8.1/47 7.9/20 10.1/7 9.4/11 9.4/14 9.6/32 7/8/48 9.0/20 8.1/3 8.9/32 6.2/28 6.5/39" id="i20140914o1330" -->
         //   - <!-- algo=Ballist series="10.4/40 10.3/42 10.6/47 10.3/56 9.2/11 9.7/16 9.6/34 9.1/39 9.9/54 9.9/58 8.4/48 8.6/50 8.6/53 7.4/54 6.5/55" id="i20140926o203021" -->

         // read series from commandline [line 20140926°0851]
         // // var a = iko.CmdsHash['series'];
         // sSeries ..

      }
      else {

         // read from somewhere
         // .. parse ..
         var a1 = sSeries.split(" ");
         for (var i = 0; i < a1.length; i++) {
            var a2 = a1[i].split("/");
            var h = new Cvgr.Algos.Ballist.Hit(a2[0], a2[1]); hits.push(h);
         }
      }

      return hits;
   }

   /**
    * This function delivers a target object depending on the given name
    *
    * @id 20140916°0921
    * @status Under construction
    * @note function Cvgr.Algos.Ballist.Ring(sRingName, nRadiusAbs, sColorRing, sColorSpace )
    * @note The details are still be to adjusted.
    * @param sTargetName {string} ..
    */
   , executeAlgo_getTarget : function(sTargetName) // Cvgr.Algos.Ballist.executeAlgo_getTarget
   {
      'use strict'; // [line 20190329°0843`18]

      var target = new Cvgr.Algos.Ballist.Target();

      if (sTargetName === 'kkspp') {
         // ref : http://commons.wikimedia.org/wiki/Category:Targets?uselang=de#mediaviewer/File:25_Meter_Precision_and_50_Meter_Pistol_Target.svg (20140926°1331)
         target.Diameter = 0.500;
         target.Naame = "Sportpistole 25 m Präzision";
         target.Shortnam = sTargetName;
         target.rings.push(new Cvgr.Algos.Ballist.Ring('10', 0.025, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '9', 0.050, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '8', 0.075, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '7', 0.100, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '6', 0.125, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '5', 0.150, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '4', 0.175, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '3', 0.200, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '2', 0.225, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '1', 0.250, 'blue' , 'white'));
      }
      else if (sTargetName === 'kkspd') {
         target.Diameter = 0.500;
         target.Naame = "Sportpistole 25 m Duell";
         target.Shortnam = sTargetName;
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '5', 0.050, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '4', 0.100, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '3', 0.150, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '2', 0.200, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '1', 0.250, 'blue' , 'black'));
      }
      else if (sTargetName === 'lg10m') {
         target.Diameter = 0.050;
         target.Naame = "Luftgewehr 10 m";
         target.Shortnam = sTargetName;
         target.rings.push(new Cvgr.Algos.Ballist.Ring('10', 0.0025, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '9', 0.0050, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '8', 0.0075, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '7', 0.0100, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '6', 0.0125, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '5', 0.0150, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '4', 0.0175, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '3', 0.0200, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '2', 0.0225, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '1', 0.0250, 'blue' , 'white'));
      }
      else if (sTargetName === 'lgdt10m') {
         target.Diameter = 0.0100;
         target.Naame = "Deutsche Luftgewehr-Scheibe 10 m";
         target.Shortnam = sTargetName;
         target.rings.push(new Cvgr.Algos.Ballist.Ring('10', 0.0005, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '9', 0.0010, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '8', 0.0015, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '7', 0.0020, 'blue' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '6', 0.0025, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '5', 0.0030, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '4', 0.0035, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '3', 0.0040, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '2', 0.0045, 'blue' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '1', 0.0050, 'blue' , 'white'));
      }
      else {
         target.Diameter = 0.1500;
         target.Naame = "Luftpistole 10 m";
         target.Shortnam = 'lupi10m';
         target.rings.push(new Cvgr.Algos.Ballist.Ring('10', 0.0055, 'black', 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '9', 0.0135, 'black', 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '8', 0.0215, 'gray' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '7', 0.0295, 'gray' , 'black'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '6', 0.0375, 'gray' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '5', 0.0455, 'gray' , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '4', 0.0535, 'red'  , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '3', 0.0615, 'red'  , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '2', 0.0695, 'red'  , 'white'));
         target.rings.push(new Cvgr.Algos.Ballist.Ring( '1', 0.0775, 'red'  , 'white'));
      }

      return target;
   }

   /**
    * This function implements the drawing algorithm
    *
    * @id 20140916°0421
    * @status under construction
    * @note The statement 'fill() includes closePath()' is true only to some
    *         degree, e.g. *not* for drawing the final line to origin.
    * @note Compatibility: Seems not to work with IE8
    * @callers • Cvgr.Func.executeFrame
    * @param {array} icos — This is Cvgr.Vars.icos[iNdx] at the caller.
    * @param {number} iNdx — The index into the Cvgr.Vars.icos array.
    */
   , executeAlgorithm : function(iko) // Cvgr.Algos.Ballist.executeAlgorithm
   {
      'use strict'; // [line 20190329°0843`15]

      // retrieve target [seq 20140916°0433]
      var tgt = Cvgr.Algos.Ballist.executeAlgo_getTarget();

      // retrieve series [seq 20140916°0434]
      var hits = Cvgr.Algos.Ballist.executeAlgo_getSeries(iko.CmdsHash['series']);

      // prepare canvas [seq 20140916°0435]
      iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
      iko.Context.fillStyle = iko.BgColor;
      iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

      // (.) calculate center point from canvas length and height [seq 20140916°0436]
      // note : The calculation is redundant to 'iSize'.
      var iCenterPoint = (iko.Width + iko.Height) / 4; // this is half iSize

      // (.) adjust center position from possible shift [seq 20140916°0437]
      var iRadiX = iCenterPoint;
      var iRadiY = iCenterPoint;
      if (iko.ShiftX !== null) {
         var iRadiX = iCenterPoint + parseInt(iko.ShiftX, 10);
      }
      if (iko.ShiftY !== null) {
         var iRadiY = iCenterPoint + parseInt(iko.ShiftY, 10);
      }

      // (.) paint rings [seq 20140916°0442]
      for (var iLoop = 0; iLoop < tgt.rings.length; iLoop++) {

         // (.) calculate current radius [seq 20140916°0443]
         // todo: Replace fixed factor by calculated factor
         var radius = iCenterPoint * tgt.rings[iLoop].radiusAbs * 12;

         // (.) draw [seq 20140916°0444]
         iko.Context.beginPath();                         // circle
         iko.Context.arc ( iRadiX                         // x coordinate, e.g. 90
                          , iRadiY                        // y coordinate, e.g. 90
                           , radius                       // radius, e.g. 90
                            , 0                           // starting point angle in radians, starting east
                             , Math.PI * 2                // endpoint angle in radians
                              , false                     // clockwise
                               );

         // (.) finish [seq 20140916°0445]
         iko.Context.closePath();
         iko.Context.strokeStyle = Trekta.Util2.colorNameToHex(tgt.rings[iLoop].colorRing);
         iko.Context.lineWidth = 1;
         iko.Context.stroke();
      }

      // (.) paint hits [seq 20140916°0446]
      for (var i = 0; i < hits.length; i++) {

         // (.) calculate radius [seq 20140916°0447]
         radius = 6;

         // (.) [seq 20140916°0448]
         var iRadiX = iCenterPoint + hits[i].X * 50 + parseInt(iko.ShiftX, 10);
         var iRadiY = iCenterPoint + hits[i].Y * 50 + parseInt(iko.ShiftY, 10);

         // (.) draw hit [seq 20140916°0452]
         iko.Context.beginPath();                      // circle
         iko.Context.arc ( iRadiX                      // x coordinate
                          , iRadiY                     // y coordinate
                           , radius                    // radius, e.g. 90
                            , 0                        // starting point angle in radians, starting east
                             , Math.PI * 2             // endpoint angle in radians
                              , false                  // clockwise
                               );

         // (.) finish [seq 20140916°0453]
         iko.Context.closePath();

         iko.Context.strokeStyle = '#4169e1'; // 'royalblue';
         iko.Context.lineWidth = 1;
         iko.Context.stroke();
      }

      // [seq 20140916°0454]
      Cvgr.Algos.Ballist.executeAlgo_drawDiagonal(iko);

      // progress [seq 20140916°0455]
      // note : Ballist algo is static anyway, progression is useless.
      //  Note todo 20190329°0833 'centralize progression'
      iko.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * iko.Hertz;
      if (iko.Angle > Math.PI * 4) {
         iko.Angle = iko.Angle - Math.PI * 4;
      }
   }

   /**
    * This object defines default properties for this algorithm
    *
    * @id 20190401°0423
    */
   , defaultProperties : {                             // [Cvgr.Algos.Ballist.defaultProperties]
   }
};
//- - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -

﻿/** ^ ^ ^ ✂ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
 * This section provides the Template algorithm
 * (This is built-in but planned to be extracted to a rider script)
 *
 * id : module 20190329°0611
 * version : 0.x.x — 20190330°0757..
 * license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 * copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
 * authors : ncm
 * encoding : UTF-8-with-BOM
 */

// Formal integration into main script [seq 20190329°0621`xx]
var Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};

/**
 * This namespace holds the Template algorithm, or any renamed one
 *
 * Usage. This is a template to spawn algorithm modules from.
 *  If you have copied canvasgear.Template.js to another file,
 *  e.g. canvasgear.MyAlgo.js, then rename this namespace and
 *  it's members respectively, e.g. Cvgr.Algos.MyAlgo etc.
 *
 * @id 20190330°0131 (after 20190329°0623)
 */
Cvgr.Algos.Template = Cvgr.Algos.Template || {};

/**
 * This function implements the drawing algorithm
 *
 * @id 201910329°0631
 * @callers Only • Cvgr.Func.executeFrame
 * @note See issue 20190329°0421 'impossible index', is it solved?
 * @param {Object} iko — The Icon object to paint
 */
Cvgr.Algos.Template.executeAlgorithm = function(iko)
{
   // prepare canvas [seq 20190329°0441]
   iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
   iko.Context.fillStyle = iko.BgColor;
   iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

   // (.) calculate center position [line 20190329°0442]
   // note : The calculation is redundant to 'iSize'.
   var iCenterX = iko.Width / 2;
   var iCenterY = iko.Height / 2;

   // (.) adjust center position by shift [seq 20190329°0443]
   iCenterX = (iko.ShiftX !== null) ? iCenterX + parseInt(iko.ShiftX, 10) : iCenterX;
   iCenterY = (iko.ShiftY !== null) ? iCenterY + parseInt(iko.ShiftY, 10) : iCenterY;

   // (.) calculate radius [seq 20190329°0444]
   var nRadius = ( (iko.Width + iko.Height) / 4) * 0.66;

   // (.) draw something [seq 20190329°0445]
   iko.Context.beginPath();
   iko.Context.arc ( iCenterX                                  // center x coordinate
                    , iCenterY                                 // center y coordinate
                     , nRadius                                 // radius
                      , 0.1 + iko.Angle                        // start angle in radians
                       , (Math.PI * 2) * 0.8  + iko.Angle      // stop angle in radians
                        , false                                // clockwise
                         );

   // (.) finish [seq 20190329°0446]
   //iko.Context.closePath();
   iko.Context.strokeStyle = iko.Color;
   iko.Context.lineWidth = 6;
   iko.Context.stroke();

   // add text [parent seq 20190331°0521 'write text']
   // See howto 20190331°0541 'about linebreaks in canvas'
   var sText = "Template intern";
   if (iko.CmdsHash['text']) {
      sText = iko.CmdsHash['text'];                    // e.g. "Hello.."
   }
   iko.Context.fillStyle = 'MediumVioletRed'; // "#102030";
   iko.Context.font = "0.9em Arial";                   // e.g. "20px Times Roman", "1.2em Arial"
   iko.Context.fillText(sText, 3, 21);

   // progress [seq 20190329°0447]
   //  Remember todo 20190329°0833 'centralize progression'
   iko.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * iko.Hertz;
   if (iko.Angle > Math.PI * 2) {
      iko.Angle = iko.Angle - Math.PI * 2;
   }
};

 /**
 * This object defines default properties for this algorithm.
 *
 * @id 201910329°0641
 */
Cvgr.Algos.Template.defaultProperties = {
   DrawNumberLimit : 0
};
// ^ ^ ^ ✂ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^

/** ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
 * This section holds the develop algorithm
 * (This is built-in but planned to be extracted to a rider script)
 *
 * id : section 20140901°0511
 */

// Formal integration [seq 20190329°0621`xx]
var Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};

/**
 * This namespace represents the 'develop' algorithm
 *
 * @id 20140901°0513
 */
Cvgr.Algos.develop = {

   /**
    * This function executes the drawing
    *
    * @id 20140901°0521 ✱
    * @status Under construction
    * @callers Only • Cvgr.Func.executeFrame
    * @param {Object} iko — This is Cvgr.Vars.icos[iNdx] from the caller
    */
   executeAlgorithm : function(iko) // [Cvgr.Algos.develop.executeAlgorithm]
   {
      'use strict';

      // preparation [seq 20140901°0531]
      var iSize = (iko.Width + iko.Height) / 2;

      // prepare canvas [seq 20140901°0533]
      iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
      iko.Context.fillStyle = iko.BgColor;
      iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

      // build some lines [seq 20140901°0535]
      var aLins = new Array();
      var oLin1 = new Cvgr.Objs.Line(3, 3, iSize -3, 3, iko.Color);
      var oLin2 = new Cvgr.Objs.Line(4, iSize - 4, iSize - 4, iSize - 4, iko.Color2);
      var oLin3 = new Cvgr.Objs.Line(5, iSize - 7, iSize - 5, 7, iko.Color3);
      aLins.push(oLin1);
      aLins.push(oLin2);
      aLins.push(oLin3);

      // draw the built lines [seq 20140901°0537]
      for (var i = 0; i < aLins.length; i++)
      {
         iko.Context.beginPath();
         iko.Context.moveTo(aLins[i].X1, aLins[i].Y1);
         iko.Context.lineTo(aLins[i].X2, aLins[i].Y2);
         iko.Context.lineWidth = 3;
         iko.Context.strokeStyle = aLins[i].Colo;
         iko.Context.stroke();
      }
   }

   /**
    * This object defines default properties for this algorithm
    *
    * @id 20140901°0541
    */
   , defaultProperties : { // [Cvgr.Algos.develop.defaultProperties]
      BgColor : 'LightCyan'
      , Color : 'LightCoral' // Red
      , Color2 : 'PaleGreen' // Green
      , Color3 : 'LightBlue' // Blue
   }
};
// ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

/** + + + ✂ + + + + + + + + + + + + + + + + + + + + + + + + + +
 * This section provides the oblongrose algorithm
 *
 * id : module 20190329°0721
 * version :
 * license : GNU LGPL v3 or later (https://www.gnu.org/licenses/lgpl.html)
 * copyright : (c) 2014 - 2019 Norbert C. Maier https://github.com/normai/canvasgear/
 * authors : ncm
 * encoding : UTF-8-with-BOM
 */

// Formal integration of cut-out into main script [seq 20190329°0621`xx]
var Cvgr = Cvgr || {};
Cvgr.Algos = Cvgr.Algos || {};

/**
 * This namespace holds the 'oblongrose' algorithm
 * (This is built-in but planned to be extracted to a rider script)
 *
 * @id 20190329°0722
 */
Cvgr.Algos.oblongrose = {

   /**
    * This function implements a drawing algorithm to draw a rose
    *
    * @id 20140828°1411
    * @status Not yet animated
    * @ref http://gnuzoo.org/rose/index.htm [20140815°0521]
    * @param {number} icos — This is Cvgr.Vars.icos[iNdx] at the caller.
    * @param {number} iNdx — The index into the icos array.
    */
   executeAlgorithm : function(iko) // Cvgr.Algos.oblongrose.executeAlgorithm
   {
      'use strict';

      // preparatory calculations [seq 20140916°0822]
      var iWhole = (iko.Width + iko.Height) / 2;
      var iHalf = iWhole / 2; // mostly not the whole is wanted but the half

      // prepare canvas [line 20140828°1423]
      iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);

      // set colors [seq 20140828°1424]
      iko.Context.strokeStyle = iko.Color;
      iko.Context.fillStyle = 'Yellow';                                // not applied below

      // rotate wrapper open [line 20190401°0442]
      // set registration point [line 20140828°1425]
      // Remember note 20190401°0441 'about rotation center point'
      // Remember issue 20190401°0435 'hamster appears multiple times'
      iko.Context.translate(iHalf, iHalf);

      // loop [seq 20140828°1426]
      var iNums = 16;
      var nRotate = 0;
      var nRotTotal = 0;
      for (var i = 0; i < iNums; i++)
      {
         // rotate [line 20140828°1427]
         nRotate = 1.7 * Math.PI / iNums;
         iko.Context.rotate(nRotate);
         nRotTotal += nRotate;

         // draw [line 20140828°1428]
         iko.Context.strokeRect ( iHalf * 0.1, iHalf * 0.1
                                 , iHalf * 0.3 , iHalf * 0.7
                                  );
      }

      // rotate wrapper close [line 20190401°0443]
      iko.Context.rotate(nRotTotal * -1);
      iko.Context.translate(iHalf * -1, iHalf * -1);
 
   }

   /**
    * This object defines default properties for this algorithm.
    *
    * @id 20190401°0421
    */
   , defaultProperties : { // [Cvgr.Algos.oblongrose.defaultProperties]
      BgColor : 'LightCyan'
      , Color : 'LightCoral' // Red
      , Color2 : 'PaleGreen' // Green
      , Color3 : 'LightBlue' // Blue
      , DrawNumberLimit : 5
   }
};
// + + + ✂ + + + + + + + + + + + + + + + + + + + + + + + + + +

// -- -- ✂ -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
/**
 * This namespace holds the 'pulse' algorithm
 * (This is built-in but planned to be extracted to a rider script)
 *
 * @id 20190329°0731
 */
Cvgr.Algos.pulse = {

   /**
    * This function implements the pulse drawing algorithm
    *
    * @id 20140829°0511
    * @descript Features are:
    *    • Adjust the drawing size relative to the canvas size
    *    • Allow parameters 'shiftx' and 'shifty'
    *    • Use parameter 'hertz' instead of the old 'speed'
    * @status
    * @param {Array} icos — Array of icon objects, Cvgr.Vars.icos[iNdx] at the caller
    * @param {Integer} iNdx — The index into the array
    */
   executeAlgorithm : function(iko) // Cvgr.Algos.pulse.executeAlgorithm
   {
      'use strict'; // [line 20190329°0843`24]

      // (.) calculate size [seq 20140829°0514]
      var nRadiFull = (iko.Width + iko.Height) / 2;
      nRadiFull = nRadiFull / 2;
      nRadiFull = nRadiFull * iko.SizeFactor;

      // (.) calculate position [seq 20140829°0516]
      var nPosX = (iko.Width / 2) + parseInt(iko.ShiftX, 9);
      var nPosY = (iko.Height / 2) + parseInt(iko.ShiftY, 9);

      // (.) calculate current radius [seq 20140829°0515]
      var nRadiCurr = 0;
      nRadiCurr = nRadiFull * Math.abs(Math.cos(iko.Angle));

      // (.) prepare canvas [seq 20140829°0513]
      iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
      iko.Context.fillStyle = "#f0f0f0";
      iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

      // (.) draw [seq 20140829°0517]
      iko.Context.beginPath();
      iko.Context.arc ( nPosX                             // center point x
                       , nPosY                            // center point y
                        , nRadiCurr                       // radius
                         , 0                              // starting point angle in radians, starting east
                          , Math.PI * 2                   // endpoint angle in radians
                           , false                        // clockwise
                            );

      // (.) finish [seq 20140829°0518]
      iko.Context.closePath();
      iko.Context.fillStyle = iko.Color;
      iko.Context.fill();

      // possibly add text [seq 20190331°0551] (after parent 20190331°0521 'write text')
      if ( iko.CmdsHash['text'] ) {
         var sText = iko.CmdsHash['text'];
         iko.Context.fillStyle = 'MediumVioletRed';
         iko.Context.font = "0.9em Arial";                   // e.g. "20px Times Roman", "1.2em Arial"
         iko.Context.fillText(sText, 3, 21);                // text, start pos x, start pos y
      }

      // (.) seq 20140829°0519 'calculate progression'
      //  Note todo 20190329°0833 'centralize progression'
      iko.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * iko.Hertz;
      if (iko.Angle > Math.PI) {
         iko.Angle = iko.Angle - Math.PI;
      }
   }

   /**
    * This object defines default properties for this algorithm.
    *
    * @id 20140829°0523
    */
   , defaultProperties : { // [Cvgr.Algos.pulse.defaultProperties]
      BgColor : 'LightCyan'
      , DrawNumberLimit : 0
   }
};
// -- -- ✂ -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

// ~~ ~~ ✂ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~
/**
 * This namespace holds the 'triangle' algorithm
 * (This is built-in but planned to be extracted to a rider script)
 *
 * @id 20190329°0741
 */
Cvgr.Algos.triangle = {

   /**
    * This function implements a drawing algorithm for an ikon
    *
    * @id 20140828o°0851
    * @status proof-of-concept
    * @see ref 20140828°0911 'MDN: Drawing shapes with canvas'
    * @see ref 20140901°0321 'William Malone: rotate canvas'
    * @param icos {Object} This is Cvgr.Vars.icos[iNdx] at the caller.
    * @param iNdx {Integer} The index into the icon objects array
    */
   executeAlgorithm : function(iko) // Cvgr.Algos.triangle.executeAlgorithm
   {
      'use strict'; // [line 20190329°0843`25]

      // preparatory calculations [seq 20140916°0823]
      // Remember issue 20140901°0331 'IE8 demands extra plus sign'
      var iSize = (iko.Width + iko.Height) / 2;
      var iPt1x = iSize * 0.5;
      var iPt1y = iSize * 0.01;
      var iPt2x = iSize * 0.8;
      var iPt2y = iSize * 0.9;
      var iPt3x = iSize * 0.2;
      var iPt3y = iPt2y;

      // prepare canvas
      iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);   // Opera works fine

      // (.) rotation
      // (.1) set registration point
      iko.Context.translate(iSize / 2, iSize / 2);
      // (.2) rotate 1 degree
      iko.Context.rotate(Cvgr.Vars.nIncTurnsPerFrame * 4 * iko.Hertz);    // 'Cvgr.Vars.nIncTurnsPerFrame * 4' is 1 rotation per second
      // (.3) move registration point back to the top left corner of canvas
      iko.Context.translate(-iSize / 2, -iSize / 2);

      // note : Remember issue 20140901°0911 'Opera fillRect() fail'

      // set background
      iko.Context.fillStyle = iko.BgColor;
      // (20140901°0912) try envelope against issue 20140901°0911 'Opera fillRect() fail'
      try
      {
         // Opera may throw 'object DOMException' here (issue 20140901°0911)
         iko.Context.fillRect(0, 0, iko.Width, iko.Height);
      }
      catch (e)
      {
         if ( Cvgr.Const.bShow_Debug_Dialogs )                            // toggle debug
         {
            alert('[debug 20140901°0913]\nException "' + e + '"');
         }
      }

      // draw
      iko.Context.beginPath();

      // (why the try see issue 20140901°0933)
      try
      {
         iko.Context.moveTo(iPt1x, iPt1y);
      }
      catch (e)
      {
         if ( Cvgr.Const.bShow_Debug_Dialogs )                            // debug toggle
         {
            alert('[debug 20140901°0932]\nException "' + e + '"');
         }
      }
      iko.Context.lineTo(iPt2x, iPt2y);
      iko.Context.lineTo(iPt3x, iPt3y);
      iko.Context.fillStyle = iko.Color;
      iko.Context.fill();
      iko.Context.closePath();
   }

   /**
    * This object defines default properties for this algorithm
    *
    * @id 20190330°0451
    */
   , defaultProperties : { // [Cvgr.Algos.develop.defaultProperties]
      BgColor : 'LightCyan'
      , Color : 'LightCoral'                           // Red
      , Color2 : 'PaleGreen'                           // Green
      , Color3 : 'LightBlue'                           // Blue
      , DrawNumberLimit : 0                            // unlimited
   }
};
// ~~ ~~ ✂ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~

// ' ' ' ✂ ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' '
/**
 * This namespace holds the 'triangulum' algorithm
 * (This is built-in but planned to be extracted to a rider script)
 *
 * @id 20190329°0751
 */
Cvgr.Algos.triangulum = {

   /**
    * This function implements the line drawing algorithm
    *
    * @id 20140828°1431
    * @status under construction
    * @see ref 20140831°0743 'mysamplecode.com → canvas draw → width and color'
    * @see ref 20140831°0742 'Alex Gheorghiu → Advanced context path painting' ✱
    * @see ref 20140831°0741 'stackoverflow → Canvas drawing multicolored lines'
    * @see ref 20140828°1422 'MDN → Stile und Farben verwenden'
    * @see ref 20140828°1421 'Quaese → Pfad-Schnittstelle stroke'
    * @see ref 20140828°1221 'Peter Kröner → Eine kleine Canvas-Einführung'
    * @note The statement 'fill() includes closePath()' is true only to some degree,
    *         e.g. *not* for drawing the final line to origin.
    * @param icos This is Cvgr.Vars.icos[iNdx] at the caller.
    * @param iNdx The index into the icos array.
    */
   executeAlgorithm : function(iko) // Cvgr.Algos.triangulum.executeAlgorithm
   {
      'use strict'; // [line 20190329°0843`26]

      // preparatory calculations [seq 20140916°0824]
      // Remember issue 20140901°0331 'IE8 demands extra plus sign'
      var iSize = (iko.Width + iko.Height) / 2;

      var nCurrAngle = iko.Angle;
      nCurrAngle = Math.sin (iko.Angle) * (iSize - 4) / 2 + iSize / 2;

      // prepare canvas
      iko.Context.clearRect(0, 0, iko.Canvas.width, iko.Canvas.height);
      iko.Context.fillStyle = iko.BgColor;
      iko.Context.fillRect(0, 0, iko.Canvas.width, iko.Canvas.height);

      // draw triangle
      iko.Context.beginPath();
      iko.Context.moveTo(3, 3);
      iko.Context.lineTo(iSize - 3, 3);
      iko.Context.lineTo(nCurrAngle, iSize - 5);
      iko.Context.fillStyle = iko.Color;
      iko.Context.fill();
      iko.Context.closePath();
      iko.Context.lineWidth = 2;
      iko.Context.strokeStyle = iko.Color2;
      iko.Context.stroke();

      // draw line
      iko.Context.beginPath();
      iko.Context.moveTo(2, iSize - 2);
      iko.Context.lineTo(iSize - 2, iSize - 2);
      iko.Context.lineWidth = 3;
      iko.Context.strokeStyle = iko.Color3;
      iko.Context.stroke();

      // maintain progress
      //  Note todo 20190329°0833 'centralize progression'
      iko.Angle += Cvgr.Vars.nIncTurnsPerFrame * Math.PI * iko.Hertz;
      if (iko.Angle > Math.PI * 4) {
         iko.Angle = iko.Angle - Math.PI * 4;
      }
   }
};
// ' ' ' ✂ ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' '

// - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -
// id : block 20190329°0131
// version : 20190329°0912 20190329°0141
// summary : This block is to be shared by scripts via cutnpaste
// callers : So far only • canvasgear.js
// note : Other commandline parser exist e.g. in terminal.js

/**
 * @id 20190329°0111 (root 20190106°0311)
 */
var Trekta = Trekta || {};

/**
 * @id 20190329°0113 (root 20190106°0313)
 */
Trekta.Util2 = Trekta.Util2 || {};


/**
 * This object defines webcolors
 *
 * @id 20140831°0321
 * @status Working
 * @callers Only function 20140831°0331 Trekta.Util2.colorNameToHex
 * @ref http://en.wikipedia.org/wiki/Web_colors [ws 20140831°0311]
 */
Trekta.Util2.Webcolors = function()
{
   'use strict'; // [line 20190329°0845`12]

   // Pink colors
   this.pink                 = '#ffc0cb';      // Pink                  FF C0 CB    255 192 203
   this.lightpink            = '#ffb6c1';      // LightPink             FF B6 C1    255 182 193
   this.hotpink              = '#ff69b4';      // HotPink               FF 69 B4    255 105 180
   this.deeppink             = '#ff1493';      // DeepPink              FF 14 93    255  20 147
   this.palevioletred        = '#db7093';      // PaleVioletRed         DB 70 93    219 112 147
   this.mediumvioletred      = '#c71585';      // MediumVioletRed       C7 15 85    199  21 133

   // Red colors
   this.lightsalmon          = '#ffa07a';      // LightSalmon           FF A0 7A    255 160 122
   this.salmon               = '#fa8072';      // Salmon                FA 80 72    250 128 114
   this.darksalmon           = '#e9967a';      // DarkSalmon            E9 96 7A    233 150 122
   this.lightcoral           = '#f08080';      // LightCoral            F0 80 80    240 128 128
   this.indianred            = '#cd5c5c';      // IndianRed             CD 5C 5C    205  92  92
   this.crimson              = '#dc143c';      // Crimson               DC 14 3C    220  20  60
   this.firebrick            = '#b22222';      // FireBrick             B2 22 22    178  34  34
   this.darkred              = '#8b0000';      // DarkRed               8B 00 00    139   0   0
   this.red                  = '#ff0000';      // Red                   FF 00 00    255   0   0

   // Orange colors
   this.orangered            = '#ff4500';      // OrangeRed             FF 45 00    255  69   0
   this.tomato               = '#ff6347';      // Tomato                FF 63 47    255  99  71
   this.coral                = '#ff7f50';      // Coral                 FF 7F 50    255 127  80
   this.darkorange           = '#ff8c00';      // DarkOrange            FF 8C 00    255 140   0
   this.orange               = '#ffa500';      // Orange                FF A5 00    255 165   0

   // Yellow colors
   this.yellow               = '#ffff00';      // Yellow                FF FF 00    255 255   0
   this.lightyellow          = '#ffffe0';      // LightYellow           FF FF E0    255 255 224
   this.lemonchiffon         = '#fffacd';      // LemonChiffon          FF FA CD    255 250 205
   this.lightgoldenrodyellow = '#fafad2';      // LightGoldenrodYellow  FA FA D2    250 250 210
   this.papayawhip           = '#ffefd5';      // PapayaWhip            FF EF D5    255 239 213
   this.moccasin             = '#ffe4b5';      // Moccasin              FF E4 B5    255 228 181
   this.peachpuff            = '#ffdab9';      // PeachPuff             FF DA B9    255 218 185
   this.palegoldenrod        = '#eee8aa';      // PaleGoldenrod         EE E8 AA    238 232 170
   this.khaki                = '#f0e68c';      // Khaki                 F0 E6 8C    240 230 140
   this.darkkhaki            = '#bdb76b';      // DarkKhaki             BD B7 6B    189 183 107
   this.gold                 = '#ffd700';      // Gold                  FF D7 00    255 215   0

   // Brown colors
   this.cornsilk             = '#fff8dc';      // Cornsilk              FF F8 DC    255 248 220
   this.blanchedalmond       = '#ffebcd';      // BlanchedAlmond        FF EB CD    255 235 205
   this.bisque               = '#ffe4c4';      // Bisque                FF E4 C4    255 228 196
   this.navajowhite          = '#ffdead';      // NavajoWhite           FF DE AD    255 222 173
   this.wheat                = '#f5deb3';      // Wheat                 F5 DE B3    245 222 179
   this.burlywood            = '#deb887';      // BurlyWood             DE B8 87    222 184 135
   this.tan                  = '#d2b48c';      // Tan                   D2 B4 8C    210 180 140
   this.rosybrown            = '#bc8f8f';      // RosyBrown             BC 8F 8F    188 143 143
   this.sandybrown           = '#f4a460';      // SandyBrown            F4 A4 60    244 164  96
   this.goldenrod            = '#daa520';      // Goldenrod             DA A5 20    218 165  32
   this.darkgoldenrod        = '#b8860b';      // DarkGoldenrod         B8 86 0B    184 134  11
   this.peru                 = '#cd853f';      // Peru                  CD 85 3F    205 133  63
   this.chocolate            = '#d2691e';      // Chocolate             D2 69 1E    210 105  30
   this.saddlebrown          = '#8b4513';      // SaddleBrown           8B 45 13    139  69  19
   this.sienna               = '#a0522d';      // Sienna                A0 52 2D    160  82  45
   this.brown                = '#a52a2a';      // Brown                 A5 2A 2A    165  42  42
   this.maroon               = '#800000';      // Maroon                80 00 00    128   0   0

   // Green colors
   this.darkolivegreen       = '#556b2f';      // DarkOliveGreen        55 6B 2F     85 107  47
   this.olive                = '#808000';      // Olive                 80 80 00    128 128   0
   this.olivedrab            = '#6b8e23';      // OliveDrab             6B 8E 23    107 142  35
   this.yellowgreen          = '#9acd32';      // YellowGreen           9A CD 32    154 205  50
   this.limegreen            = '#32cd32';      // LimeGreen             32 CD 32     50 205  50
   this.lime                 = '#00ff00';      // Lime                  00 FF 00      0 255   0
   this.lawngreen            = '#7cfc00';      // LawnGreen             7C FC 00    124 252   0
   this.chartreuse           = '#7fff00';      // Chartreuse            7F FF 00    127 255   0
   this.greenyellow          = '#adff2f';      // GreenYellow           AD FF 2F    173 255  47
   this.springgreen          = '#00ff7f';      // SpringGreen           00 FF 7F      0 255 127
   this.mediumspringgreen    = '#00fa9a';      // MediumSpringGreen     00 FA 9A      0 250 154
   this.lightgreen           = '#90ee90';      // LightGreen            90 EE 90    144 238 144
   this.palegreen            = '#98fb98';      // PaleGreen             98 FB 98    152 251 152
   this.darkseagreen         = '#8fbc8f';      // DarkSeaGreen          8F BC 8F    143 188 143
   this.mediumseagreen       = '#3cb371';      // MediumSeaGreen        3C B3 71     60 179 113
   this.seagreen             = '#2e8b57';      // SeaGreen              2E 8B 57     46 139  87
   this.forestgreen          = '#228b22';      // ForestGreen           22 8B 22     34 139  34
   this.green                = '#008000';      // Green                 00 80 00      0 128   0
   this.darkgreen            = '#006400';      // DarkGreen             00 64 00      0 100   0

   // Cyan colors
   this.mediumaquamarine     = '#66cdaa';      // MediumAquamarine      66 CD AA    102 205 170
   this.aqua                 = '#00ffff';      // Aqua                  00 FF FF      0 255 255
   this.cyan                 = '#00ffff';      // Cyan                  00 FF FF      0 255 255
   this.lightcyan            = '#e0ffff';      // LightCyan             E0 FF FF    224 255 255
   this.paleturquoise        = '#afeeee';      // PaleTurquoise         AF EE EE    175 238 238
   this.aquamarine           = '#7fffd4';      // Aquamarine            7F FF D4    127 255 212
   this.turquoise            = '#40e0d0';      // Turquoise             40 E0 D0     64 224 208
   this.mediumturquoise      = '#48d1cc';      // MediumTurquoise       48 D1 CC     72 209 204
   this.darkturquoise        = '#00ced1';      // DarkTurquoise         00 CE D1      0 206 209
   this.lightseagreen        = '#20b2aa';      // LightSeaGreen         20 B2 AA     32 178 170
   this.cadetblue            = '#5f9ea0';      // CadetBlue             5F 9E A0     95 158 160
   this.darkcyan             = '#008b8b';      // DarkCyan              00 8B 8B      0 139 139
   this.teal                 = '#008080';      // Teal                  00 80 80      0 128 128

   // Blue colors
   this.lightsteelblue       = '#b0c4de';      // LightSteelBlue        B0 C4 DE    176 196 222
   this.powderblue           = '#b0e0e6';      // PowderBlue            B0 E0 E6    176 224 230
   this.lightblue            = '#add8e6';      // LightBlue             AD D8 E6    173 216 230
   this.skyblue              = '#87ceeb';      // SkyBlue               87 CE EB    135 206 235
   this.lightskyblue         = '#87cefa';      // LightSkyBlue          87 CE FA    135 206 250
   this.deepskyblue          = '#00bfff';      // DeepSkyBlue           00 BF FF      0 191 255
   this.dodgerblue           = '#1e90ff';      // DodgerBlue            1E 90 FF     30 144 255
   this.cornflowerblue       = '#6495ed';      // CornflowerBlue        64 95 ED    100 149 237
   this.steelblue            = '#4682b4';      // SteelBlue             46 82 B4     70 130 180
   this.royalblue            = '#4169e1';      // RoyalBlue             41 69 E1     65 105 225
   this.blue                 = '#0000ff';      // Blue                  00 00 FF      0   0 255
   this.mediumblue           = '#0000cd';      // MediumBlue            00 00 CD      0   0 205
   this.darkblue             = '#00008b';      // DarkBlue              00 00 8B      0   0 139
   this.navy                 = '#000080';      // Navy                  00 00 80      0   0 128
   this.midnightblue         = '#191970';      // MidnightBlue          19 19 70     25  25 112

   // Purple colors
   this.lavender             = '#e6e6fa';      // Lavender              E6 E6 FA    230 230 250
   this.thistle              = '#d8bfd8';      // Thistle               D8 BF D8    216 191 216
   this.plum                 = '#dda0dd';      // Plum                  DD A0 DD    221 160 221
   this.violet               = '#ee82ee';      // Violet                EE 82 EE    238 130 238
   this.orchid               = '#da70d6';      // Orchid                DA 70 D6    218 112 214
   this.fuchsia              = '#ff00ff';      // Fuchsia               FF 00 FF    255   0 255
   this.magenta              = '#ff00ff';      // Magenta               FF 00 FF    255   0 255
   this.mediumorchid         = '#ba55d3';      // MediumOrchid          BA 55 D3    186  85 211
   this.mediumpurple         = '#9370db';      // MediumPurple          93 70 DB    147 112 219
   this.blueviolet           = '#8a2be2';      // BlueViolet            8A 2B E2    138  43 226
   this.darkviolet           = '#9400d3';      // DarkViolet            94 00 D3    148   0 211
   this.darkorchid           = '#9932cc';      // DarkOrchid            99 32 CC    153  50 204
   this.darkmagenta          = '#8b008b';      // DarkMagenta           8B 00 8B    139   0 139
   this.purple               = '#800080';      // Purple                80 00 80    128   0 128
   this.indigo               = '#4b0082';      // Indigo                4B 00 82     75   0 130
   this.darkslateblue        = '#483d8b';      // DarkSlateBlue         48 3D 8B     72  61 139
   this.slateblue            = '#6a5acd';      // SlateBlue             6A 5A CD    106  90 205
   this.mediumslateblue      = '#7b68ee';      // MediumSlateBlue       7B 68 EE    123 104 238

   // White colors
   this.white                = '#ffffff';      // White                 FF FF FF    255 255 255
   this.snow                 = '#fffafa';      // Snow                  FF FA FA    255 250 250
   this.honeydew             = '#f0fff0';      // Honeydew              F0 FF F0    240 255 240
   this.mintcream            = '#f5fffa';      // MintCream             F5 FF FA    245 255 250
   this.azure                = '#f0ffff';      // Azure                 F0 FF FF    240 255 255
   this.aliceblue            = '#f0f8ff';      // AliceBlue             F0 F8 FF    240 248 255
   this.ghostwhite           = '#f8f8ff';      // GhostWhite            F8 F8 FF    248 248 255
   this.whitesmoke           = '#f5f5f5';      // WhiteSmoke            F5 F5 F5    245 245 245
   this.seashell             = '#fff5ee';      // Seashell              FF F5 EE    255 245 238
   this.beige                = '#f5f5dc';      // Beige                 F5 F5 DC    245 245 220
   this.oldlace              = '#fdf5e6';      // OldLace               FD F5 E6    253 245 230
   this.floralwhite          = '#fffaf0';      // FloralWhite           FF FA F0    255 250 240
   this.ivory                = '#fffff0';      // Ivory                 FF FF F0    255 255 240
   this.antiquewhite         = '#faebd7';      // AntiqueWhite          FA EB D7    250 235 215
   this.linen                = '#faF0e6';      // Linen                 FA F0 E6    250 240 230
   this.lavenderblush        = '#fff0f5';      // LavenderBlush         FF F0 F5    255 240 245
   this.mistyrose            = '#ffe4e1';      // MistyRose             FF E4 E1    255 228 225

   // Gray/Black colors
   this.gainsboro            = '#dcdcdc';      // Gainsboro             DC DC DC    220 220 220
   this.lightgrey            = '#d3d3d3';      // LightGrey             D3 D3 D3    211 211 211
   this.silver               = '#c0c0c0';      // Silver                C0 C0 C0    192 192 192
   this.darkgray             = '#a9a9a9';      // DarkGray              A9 A9 A9    169 169 169
   this.gray                 = '#808080';      // Gray                  80 80 80    128 128 128
   this.dimgray              = '#696969';      // DimGray               69 69 69    105 105 105
   this.lightslategray       = '#778899';      // LightSlateGray        77 88 99    119 136 153
   this.slategray            = '#708090';      // SlateGray             70 80 90    112 128 144
   this.darkslategray        = '#2f4f4f';      // DarkSlateGray         2F 4F 4F     47  79  79
   this.black                = '#000000';      // Black                 00 00 00      0   0   0

   // Additional colors
   this.rebeccapurple        = '#663399';      // Rebeccapurple         66 33 99    102  51 152

   // Custom colors
   this.verydarkviolett      = '#d000d0';      // (custom color 20140903°0341)
};

/**
 * This function translates a X11 web color name to it's hex value
 *
 * @id 20140831°0331
 * @status Working
 * @callers Only • CanvasGear
 * @note This helps to use webcolors with IE8.
 * @todo 20140926°1323 : Implement some validations because e.g. a color '1'
 *           as Cvgr.Algos.Ballist.Ring.color causes difficult to debug failures.
 * @todo 20180618°0731 : Shift this function into class Webcolors
 * @returns The wanted color hex value, e.g. '#FF0000' for 'red', or '#C0C0C0' silver for wrong names.
 * @param {string} sName — The name of the wanted color
 */
Trekta.Util2.colorNameToHex = function(sName) {

   'use strict'; // [line 20190329°0845`13]

   var cols = new Trekta.Util2.Webcolors;
   var sCol = '';

   sName = sName.toLowerCase();

   if (cols[sName]) {
      sCol = cols[sName];
   }
   else {
      sCol = '#C0C0C0'; // silver for unknown color names
   }

   return sCol;
};

/**
 * This ~static ~class provides a method to parse a commandstring
 *
 * @id 20140926°0641
 * @status Works fine for key/value pairs only. Limitation: This detects
 *    only key/value pairs, but not single command options.
 * @callers So far only • CanvasGear
 * @note Code inspired by ref 20140926°0621 'Krasimir: Simple command line parser in JS'
 * @note See also ref 20140828°0832 'majstro: tokenizing with split'
 * @note Test input
 *    - <!-- algo="triangle" color=mediumspringgreen hertz=0.1 -->
 *    - <!-- algo=Ballist series="10.7/55 9.3/43 8.5/39 6.2/43 3.3/33 1.0/11" shiftx=20 shifty=20 id="i20140916o0731" -->
 *    - <!-- algo=pulse color=orange hertz=0.2 shiftx=11 shifty=11 -->
 *    -
 */
Trekta.Util2.CmdlinParser = ( function()
{

   'use strict'; // [line 20190329°0845`14]
   var parse = null; // wanted with strict mode [line 20190329°0853]

   /**
    * This function parses a commandline
    *
    * @id 20140926°0642
    * @todo 20180618°0751 In NetBeans Navigator, this function is listed on
    *    script level. Make it appear inside the Daf.Utilis.CmdlinParser level.
    * @param sCmdlin {string} The string to be parsed
    * @param bProcessQuotes {boolean} Flag whether to process quotes or not
    * @returns
    */
   parse = function(sCmdlin, bProcessQuotes)
   {
      // paranoia — advisably
      if (sCmdlin === undefined) {
         sCmdlin = '';
      }

      var args = [];
      var bQuoteReading = false;
      var sToken = '';
      for ( var i = 0; i < sCmdlin.length; i++)
      {
         // look for token delimiter
         if ( ((sCmdlin.charAt(i) === ' ') || (sCmdlin.charAt(i) === '=')) && (! bQuoteReading) ) {

            // look for token delimiter found, finish token
            args.push(sToken);
            sToken = '';

            // re-supplement equal sign
            if (sCmdlin.charAt(i) === '=') {
               args.push('=');
            }
         }
         else {

            // no token delimiter, continue with token
            if (( sCmdlin.charAt(i) === '\"') && bProcessQuotes ) {
               bQuoteReading = (! bQuoteReading);
            }
            else {
               sToken += sCmdlin.charAt(i);
            }
         }
      }
      args.push(sToken);
      // now the plain token array is ready, the equal sign is also a token.

      // There are two parsing modes: (1) plain parse and (2) kvp parse.
      var bParsePlain = true; // (flag 20140926°1121)
      if (! bParsePlain) {

         // (a) The old and proven mode. It reads only the equations
         //  and is just dropping single commands [seq 20140926°06322]
         // note : This algo points to an equal sign, and then it processes
         //   the elements above and below.

         // (a.1) loop over the token array and assemble key/value pairs from the equal signs
         var kvps = [];
         for (var i = 0; i < args.length; i++) {
            if (i === 0) {
               continue;
            }

            if (i >= (args.length - 1)) {
               continue;
            }

            // assemble key/value pair
            if (args[i] === '=') {
               kvps[args[i-1]] = args[i+1];
               i++;                                                    // better do two or three increments?
            }
         }
      }
      else
      {
         // (b) parsing algo next version [seq 20140926°1111]
         // summary : This algo points to the first token, then looks ahead for
         //  an equal sign. This has the advantage, that any solitary token is
         //  treated like a key as well, just later it will no more receive a value.
         // hint : One loop finishes one CmdsHash element/cell.

         // (b.1) loop over the token array and assemble key/value pairs from the equal signs
         var kvps = [];
         var sCurrKey = '';
         for (var i = 0; i < args.length; i++) {

            // (b.2) possibly skip empty elements
            // note : This cleaning could be done separately before the loop. As
            //    well it is not yet exactly clear, what happens with blank values.
            if (args[i] === '') {                                      // experimental
               continue;
            }

            // (b.3) read key name and create key with empty value
            sCurrKey = args[i];
            kvps[sCurrKey] = '<n/a>';                                  // '<n/a>' is a maker, may be replaced by null or the like

            // (b.4) is next token an equal sign?
            if (args[i + 1] === '=') {
               // complete current key/value pair with value
               kvps[sCurrKey] = args[i + 2];
               sCurrKey = '<n?a>';                                     // reset

               i++;                                                    // forward to equal sign
               i++;                                                    // forward to this value
               continue;                                               // forward to next key
            }
            else {
               continue;                                               // forward to next key
            }
         }
      }
      return kvps;
   };

   // Curiously, if you place the curly bracket behind return on the
   //  next line, the script will be broken (note 20160416°1311)
   return {
      parse : parse
   };
})();
// - - - ✂ - - - - - - - - - - - - - - - - - - - - - - - - - -

// ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// summary : This area is shared via cutnpaste by those scripts:
//            • dafutils.js • canvasgear.js • slidegear.js
// id : area 20190106°0307
// version : 20190331°0242 // 20190329°0913

/**
 * This namespace shall be root namespace
 *
 * @id 20190106°0311
 * @callers
 */
var Trekta = Trekta || {};

/**
 * This namespace shall provide some general basic functionalities.
 *
 *  The section between ~~~ Schnippel ~~~ and ~~~ Schnappel ~~~ can be cut
 *  and pasted to other scripts to provide them independent standalone basics.
 *
 * @id 20190106°0313
 */
Trekta.Utils = Trekta.Utils || {

   /**
    * This function retrieves the filename of the page to be edited
    *
    * @id 20110820°1741
    * @note Remember issue 20110901°1741 'get self filename for default page'
    * @callers • 20120827°1511 getFilenamePlain • 20150411°0651 featuresWorkoff_1_loopAll
    *      • 20150515°1241 sitmapWorkoff_process_Cakecrumbs1 • 20120830°0451 editFinishTransmit
    * @returns {String} e.g. 'daftari/daftari/login.html' (with Firefox)
    */
   getFileNameFull : function() // [Trekta.Utils.getFileNameFull]
   {
      'use strict'; // [line 20190329°0847`12]

      // read URL of this page
      // Values are e.g.
      //    • 'http://localhost/eps/index.html?XDEBUG_SESSION_START=netbeans-xdebug#'
      //    • 'file:///G:/work/daftaridev/trunk/daftari/moonbouncy.html' (not yet working)
      var sUrl = document.location.href;

      // remove possible query after the file name
      sUrl = sUrl.substring(0, (sUrl.indexOf('?') === -1) ? sUrl.length : sUrl.indexOf('?'));

      // remove possible anchor at the end
      sUrl = sUrl.substring(0, (sUrl.indexOf('#') === -1) ? sUrl.length : sUrl.indexOf('#'));

      return sUrl;
   }

   /**
    * This function gets the plain filename of the page, e.g. 'help.html'
    *
    * @id 20120827°1511
    * @callers E.g. • dafdispatch.js::workoff_Cake_0_go
    * @returns {String} The plainfilename, e.g. 'help.html'
    */
   , getFilenamePlain : function() // [Trekta.Utils.getFileNameFull]
   {
      'use strict'; // [line 20190329°0847`13]

      var sUrl = Trekta.Utils.getFileNameFull(); // e.g 'daftari/daftari/login.html' (in FF)

      // fix issue 20181228°0931 'slideshow fails' [seq 20181228°0935]
      if ( sUrl.indexOf('/', sUrl.length - 1) !== -1 ) { // 'endswith' replacement, see howto 20181228°0936
         sUrl += 'index.html';
      }

      var a = sUrl.split('/');
      sUrl = a[a.length - 1];
      return sUrl;
   }

   /**
    * This helper function delivers an XMLHttp object
    *
    * @id : 20110816°1622
    * @ref : 20110816°1421 'first simple ajax example'
    * @note 20150515°173101 : This function seems to work even with IE8
    * @note : Any AJAX request might be easier done with jQuery, e.g. like $.ajax()
    * @callers : • readTextFile1 • MakeRequest
    * @note :
    */
   , getXMLHttp : function() // [Trekta.Utils.getFileNameFull]
   {
      'use strict'; // [line 20190329°0847`14]

      var xmlHttp;

      // () seqence 20150515°1612 'browser switch'
      // note : Heureka, now we can read the XML file in dafdispatch.js.
      //    This solves issue 20150515°1411 'jquery get() fails in IE8'.
      // note : We do not use variable Trekta.Utils.bIs_Browser_Explorer anymore,
      //    so this function can be used without .. daftari.js, e.g. in fadeinfiles.js.
      // note : Tested only with IE8, not yet with any higher IE version.
      if ( ! Trekta.Utils.bIs_Browser_Explorer ) {

         // Firefox, Opera 8.0+, Safari
         // todo 20190209°0836 : Implement feature detect and notify if not
         //    available. Then it will be different, what exactly the XMLHttpRequest
         //    object does handle. See ref 20190209°0853 'MDN → Using XMLHttpRequest'.
         xmlHttp = new XMLHttpRequest();

         // [seq 20160616°0231] experimentally preserved from throwaway old sequence
         // note : Does it make sense to keep this sequence here? Not really.
         //  It might make a bit sense, if we distrust above condition from the
         //  DafUtils library, and we want make our own opinion. And second,
         //  this statement is may ubiquitous appear in JS, like a watchdog,
         //  or perhaps like human speakers often use 'aeh'.
         var bFlag_SnipArchival_NaviAppNamExplo = false; // flag 20160616°0251

         // () condition 20160616°0241
         if (bFlag_SnipArchival_NaviAppNamExplo) {
            if ( Trekta.Utils.bIs_Browser_Explorer ) {
               throw 'The browser is IE';
            }
         }
      }
      else {
         // Internet Explorer (IE8)
         // todo 20190209°0835 : Switch off this sequence, this seems
         //    to be for Internet Exporer 5 and 6.
         try {
            xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
         }
         catch(e) {
            try {
               xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch(e) {
               alert('Sorry, your browser does not support AJAX [message 20160613°0421]');
               return false;
            }
         }
      }
      return xmlHttp;
   }

   /**
    * This function escapes a string to be used as HTML output
    *
    * @id : 20140926°1431
    * @callers : • Cvgr.Func.executeFrame
    * @todo  In FadeInFiles seq 20151106°1822 and seq 20151106°1821
    *            shall use this function here. [todo 20190328°0943]
    * @param sHtml {String} The HTML fragment to be escaped
    * @returns {String} The wanted escaped HTML fragment
    */
   , htmlEscape : function(sHtml) // [Trekta.Utils.htmlEscape]
   {
      'use strict'; // [line 20190329°0847`15]

      sHtml = sHtml.replace(/</g, '&lt;'); // g = replace all hits, not only the first
      sHtml = sHtml.replace(/>/g, '&gt;');

      return sHtml;
   }

   /**
    * This function tests, whether the given script is already loaded or not.
    *
    * @id 20160503°0231
    * @status
    * @callers ..
    * @param {string} sWantedScript — The plain name of the wanted script (not a complete path)
    * @returns {boolean} Flag telling whether the script is loaded or not.
    */
   , isScriptAlreadyLoaded : function (sWantedScript) // [Trekta.Utils.isScriptAlreadyLoaded]
   {
      'use strict'; // [line 20190329°0847`16]

      var regexp = null;

      // build the appropriate regex variable [seq 20160623°0311]
      // note : See howto 20160621°0141 'programmatically build regex'
      // note : "/" seems automatically replaced by "\/"!
      var s = sWantedScript.replace(/\./g, "\\.");                     // e.g. '/slidegear.js' to '/slidegear\.js$'
      s = s + '$';
      regexp = new RegExp(s, '');                                      // e.g. /dafutils\.js$/

      // algo 20160503°0241 (compare algo 20110820°2042)
      var scripts = document.getElementsByTagName('SCRIPT');
      if (scripts && scripts.length > 0) {
         for (var i in scripts) {
            if (scripts[i].src) {
               if (scripts[i].src.match(regexp)) {
                  return true;
               }
            }
         }
      }
      return false;
   }

   /**
    * This function loads the given script then calls the given function
    *
    * @id 20110821°0121
    * @version 20190331°0241 added parameter for onError callback
    * @version 20181229°1941 now with parameter for onload callback function
    * @status works
    * @chain project 20181230°0211 http://www.trekta.biz/svn/demosjs/trunk/pullbehind
    * @note About how exactly to call function(s) in the loaded script, see
    *    e.g. issue 20160503°0211 and seq 20160624°0411 'pull-behind fancytree'.
    * @note See howto 20181229°1943 'summary on pullbehind'
    * @callers • dafstart.js::callCanarySqueak • daftari.js::pull-behind slides
    *    • daftari.js::pull-behind fancytree • canvasgear.js::..
    * @param {String} sScriptToLoad The path from page to script, e.g. "./../../daftari/js/daftaro/dafcanary.js", 'js/daftaro/dafcanary.js'
    * @param {Function} callbackOnload The callback function for the script onload event
    * @param {Function} callbackOnerror The callback function for the script onerror event
    * @returns {Boolean}  Success flag (just a dummy always true)
    */
   , pullScriptBehind : function ( sScriptToLoad, callbackOnload, callbackOnerror )
   {
      'use strict'; // [line 20190329°0847`17]

      // avoid multiple loading [seq 20110821°0122]
      if ( Trekta.Utils.isScriptAlreadyLoaded(sScriptToLoad) ) {
         if ( Trekta.Utils.bShow_Debug_Dialogs ) {
            alert ("[Debug]\n\nScript is already loaded:\n\n" + sScriptToLoad);
         }
         callbackOnload();
         return;
      }

      // workaround against workaround [condition 20190329°0151]
      if ( typeof DafStart !== 'undefined' ) {

         // bad workaround for s_DaftariBaseFolderRel mismatch [seq 20190211°0131]
         //  The reason is, that s_DaftariBaseFolderRel is the folder where
         //  the calling script resides, not the Daftari base folder.
         var sScriptSource = DafStart.Conf.s_DaftariBaseFolderRel + sScriptToLoad;
         if ( sScriptToLoad.indexOf('showdown/showdown' ) > 0) {
            sScriptSource = sScriptToLoad; // e.g. "http://localhost/workspaces/daftaridev/trunk/daftari/js.libs/showdown/showdown.min.js"
         }
      }
      else {
         // call from • CanvasGear
         sScriptSource = sScriptToLoad;
      }

      // prepare the involved elements [seq 20110821°0123]
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');

      // set the trivial properties [seq 20110821°0124]
      script.type = 'text/javascript';
      script.src = sScriptSource; // DafStart.Conf.s_DaftariBaseFolderRel + sScriptToLoad;

      // set the non-trivial but crucial property [line 20181229°1932]
      // note : Remember todo 20181229°1931 'make pullbehind state-of-the-art'
      script.onload = callbackOnload;

      // [condition 20190331°0242]
      if ((typeof callbackOnerror !== 'undefined') && (callbackOnerror !== null)) {
         script.onerror = callbackOnerror;
      }

      // ignit the pulling [seq 20110821°0125]
      head.appendChild(script);

      return true;
   }

   /**
    * This function reads a file via Ajax
    *
    * @id 20140704°1011
    * @status productive
    * @note 20150515°173102 : This function seems to work even with IE8
    * @note Remember issue 20140713°1121 'read file via filesystem protocol'
    * @note Remember todo 20150517°0121 'implement local file reading after Dean Edwards 20150516°0612'
    * @note This function does now work via filesystem protocol with Chrome.
    * @ref http://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript [20160611°0341]
    * @ref http://stackoverflow.com/questions/6338797/jquery-to-load-text-file-data [20140625°1731]
    * @ref http://stackoverflow.com/questions/18440241/load-div-content-from-one-page-and-show-it-to-another [20140627°1111]
    * @ref http://stackoverflow.com/questions/14446447/javascript-read-local-text-file [20140704°0842]
    * @todo 20190211°0151 : Make all requests asynchronous (param bAsync = true).
    * @callers
    *     • Func 20190106°0615 slidegear.js::o2ReadSetup_ImageList : *.json
    *     • daflingos.js::getLangFromCrumb                    : sitmaplangs.json // fails with async
    *     • dafsitmap.js::sitmapWorkoff_process_Cakecrumbs1   : sitmapdaf.xml
    *     • fadeinfiles.js::fadeInFiles_fillBehind           : given textfile
    *     • fadeinfiles.js::fadeInFiles_fillPre()             : given textfile
    * @param sFilename {String} — Path to file to be read
    * @param bAsync {Boolean} — Request flavour flag (prefere asynchronous)
    * @returns {String} The content of the wanted file
    */
   , readTextFile1 : function(sFilename, bAsync) // [Trekta.Utils.readTextFile1]
   {
      'use strict'; // [line 20190329°0847`18]

      // () preparation
      var sRead = '';

      // () use a wrapper instead direct XMLHttpRequest
      var xmlHttp = Trekta.Utils.getXMLHttp();

      // () set request parameters
      // See issue 20180304°0611 'Synchronous XMLHttpRequest deprecated'. But
      //  async = 'true' works not for all, see issue 20181229°1911 'make async work'
      if (bAsync) {
         xmlHttp.open("GET", sFilename, true); // [line 20190211°0147]
      }
      else {
         xmlHttp.open("GET", sFilename, false); // [line 20180304°0614]
      }

      // () probe the ongoing
      xmlHttp.onreadystatechange = function () {
         if ( xmlHttp.readyState === 4 ) {
            if ( xmlHttp.status === 200 || xmlHttp.status === 0 ) {
               sRead = xmlHttp.responseText;
            }
         }
      };

      // () finally perform the request
      try {
         // If file to read does not exist, we get exception "Failed to load
         //  resource: the server responded with a status of 404 (Not Found)"
         // See issue 20181228°0937 'try to look for file but without error 404'
         xmlHttp.send(null);
      }
      catch (ex)
      {
         // note 20160624°0131 : To test below error messages, browse pages
         // - file:///X:/.../daftari/manual/fadeinfiles.html with Firefox
         // - file:///X:/.../daftari/manual/slideshow.html with Chrome
         var sMsg = "<b>Sorry, some feature on this page does not work.</b>"
                   + '\n File <tt>' + sFilename + '</tt> could not be read.' // [info 20160622°0131]
                   + "\nYour browser said: "
                    + '<tt>' + ex.message + '</tt>.' // e.g. "A network error occurred".
                     ;

         // ref : screenshot 20160911°1221 'Chrome debugger showing exception'
         // ref : issue 20150516°0531 'Chrome cannot load local files'
         if ( Trekta.Utils.bIs_Browser_Chrome && (location.protocol === 'file:') ) {
            sMsg += "\nYour browser seems to be Chrome, and this does not read files via file protocol."
                 + "\nThere are two <b>solutions</b>: (1) Use a different browser, e.g. Firefox or IE"
                 + "\nor (2) view this page from <tt>localhost</tt> with a HTTP server."
                  ;
         }
         else if ( Trekta.Utils.bIs_Browser_Firefox && (location.protocol === 'file:') ) {
            sMsg += "\nYour browser seems to be <b>Firefox</b>, and this does not read files"
                 + "\nwith a path going below the current directory via file protocol."
                 + "\nThere are two <b>solutions</b>: (1) Use a different browser, e.g. Chrome or IE"
                 + "\nor (2)  view this page from <tt>localhost</tt> with a HTTP server."
                  ;
         }
         else {
            sMsg += '\n [info 20160622°0131] Failed reading file ' + sFilename + '.';
         }
      }

      return sRead;
   }

   /**
    * This function returns the path to the given script .. using regex
    *
    * @id 20110820°2041
    * @status working
    * @callers • CanvasGear func 20140815°1221 executeFrame
    * @param sScriptName {String} The name of the canary script, e.g. 'sitmapdaf.js'.
    * @returns {String} The wanted path, where the given script resides, but
    *    there are browser differences, e.g.
    *     - FF etc : scripts[i].src = 'http://localhost/manual/daftari/daftari.js'
    *     - IE     : scripts[i].src = '../daftari/daftari.js'
    */
   , retrieveScriptFolderAbs : function (sScriptName) // [Trekta.Utils.retrieveScriptFolderAbs]
   {
      'use strict'; // [line 20190329°0847`22]

      var s = '';

      // () prepare regex [seq 20160621°0142]
      var regexMatch = / /;                                               // space between slashes prevents a syntax error
      var regexReplace = / /;
      s = sScriptName.replace(/\./g, "\\.") + "$";                        // e.g. 'dafutils.js' to 'dafutils\.js$'
      regexMatch = new RegExp(s, '');                                     // e.g. /dafutils\.js$/
      s = '(.*)' + s;                                                     // prepend group
      regexReplace = new RegExp(s, '');                                   // e.g. /(.*)dafutils\.js$/ ('/' seems automatically replaced by '\/')

      // () algo 20110820°2042 do the job (compare algo 20160503°0241)
      var path = '';
      var scripts = document.getElementsByTagName('SCRIPT');              // or 'script'
      if (scripts && scripts.length > 0) {
         for (var i in scripts) {
            // note : There are browser differences, e.g.
            //    • FF etc : scripts[i].src = 'http://localhost/manual/daftari/daftari.js'
            //    • IE     : scripts[i].src = '../daftari/daftari.js'
            if (scripts[i].src) {
               if ( scripts[i].src.match(regexMatch) ) {                  // e.g. /dafstart\.js$/
                  path = scripts[i].src.replace(regexReplace, '$1');      // e.g. /(.*)dafstart.js$/
               }
            }
         }
      }

      return path; // e.g. "http://localhost/daftaridev/trunk/daftari/js/daftaro/"
   }

   /**
    * This function tells the relative path from the page to the given given script
    *
    * This function is useful if the script uses resources, e.g. images,
    *  which are located relative to the script, as typically is the case
    *  within a project folder structure.
    *
    * @id 20160501°1611
    * @ref See howto 20190209°0131 'retrieve this script path'
    * @todo 20190316°0141 'call retrieveScriptFolderRel without canary'
    *     Implement the possibility to call the function
    *     without parameter. Then we have no canary to seach for in the script
    *     tags, but we use the last from the list. This is the last one loaded,
    *     and mostly means the calling script itself.
    * @callers • dafstart.js from scriptlevel
    * @param sCanary {String} Trailing part of the wanted script, e.g. '/js/daftaro/dafutils.js'
    * @returns {String} The path to the folder where the given script resides
                *           , e.g. "'/js/daftaro/dafutils.js'"
    */
   , retrieveScriptFolderRel : function (sCanary)
   {
      'use strict'; // [line 20190329°0847`23]

      var s = '';

      // () get the script tags list
      var scripts = document.getElementsByTagName('script');

      // () find the canary script tag
      var script = null;
      var bFound = false;
      for (var i = 0; i < scripts.length; i++) {
         if (scripts[i].src.indexOf(sCanary) > 0) {
            script = scripts[i];
            bFound = true;
            break;
         }
      }

      // paranoia
      if (! bFound) {
         s = '[20160501°1631] Fatal error'
            + '\n' + 'The wanted script could not be found.'
             + '\n' + 'It looks like the search string is wrong.'
              + '\n\n' + 'search string = ' + sCanary
               ;
         alert(s);
         return '';
      }

      // (.1) get the DOM internal absolute path
      //  This is just for fun, not finally wanted.
      s = script.src;
      s = s.substring(0, (s.length - sCanary.length));         // used as canary is '/js/daftaro/dafutils.js'
      Trekta.Utils.s_DaftariBaseFolderAbs = s;                 // e.g. "file:///G:/work/downtown/daftaridev/trunk/daftari/"

      // (.2) get the script tag's literal path (algo 20111225°1251)
      var sPathLiteral = '';
      for (var i = 0; i < script.attributes.length; i++) {
         if (script.attributes[i].name === 'src') {
            sPathLiteral = script.attributes[i].value;
            break;
         }
      }

      // reduce from canary script path to folder only path [seq 20190316°0131]
      // E.g. for sCanary "/js/daftaro/dafutils.js" :
      //    • "./../../daftari/js/daftaro/dafutils.js" ⇒ "./../../daftari/"
      //    • "./daftari/js/daftaro/dafutils.js"       ⇒ "./daftari/"
      var sPathOnly = sPathLiteral.substring ( 0 , ( sPathLiteral.length - sCanary.length + 1 ) );

      return sPathOnly;
   }

   /**
    * This function daisychains the given function on the windows.onload events
    *
    * @id 20160614°0331
    * @note Remember ref 20190328°0953 'mdn → addEventListener'
    * @callers
    * @param funczion {function} The function to be appended to the window.onload event
    * @returns nothing
    */
   , windowOnloadDaisychain : function(funczion) // [Trekta.Utils.windowOnloadDaisychain]
   {
      'use strict'; // [line 20190329°0847`24]

      // is the onload handler already used?
      if ( window.onload ) {
         // preserve existing function(s) and append our additional function
         var ld = window.onload;
         window.onload = function() {
            ld();
            funczion();
         };
      }
      else {
         // no other handlers are registered yet
         window.onload = function() {
            funczion();
         };
      }
   }

   /**
    * This ~constant provides a flag whether the browser is Chrome or not
    *
    *  Explanation. The plain expression "navigator.appName.match(/Chrome/)"
    *  results in either True or Null. But I prefere the result being either
    *  True or False. This is achieved by wrapping the expression in the
    *  ternary operator, manually replacing Null by false.
    *
    * @todo 20190209°0833 : For browser detection, Inconsequently for some we use
    *    navigator.userAgent, for some we use navigator.appName. Standardize this.
    * @id 20160622°0221
    * @type Boolean
    */
   , bIs_Browser_Chrome : ( navigator.userAgent.match(/Chrome/) ? true : false ) // [Trekta.Utils.bIs_Browser_Chrome]

   /**
    * This ~constant provides a flag whether the browser is Internet Exporer or not
    *
    * @id 20150209°0941
    * @todo 20190209°0837 : Refine algo. Formerly we used the plain
    *    comparison 'if ( navigator.appName === "Microsoft Internet Explorer" )'.
    *    For code, compare function getBrowserInfo() in jquery.fancytree.logger.js.
    *    For code, compare function getIEVersion() in canvasgearexcanvas.js.
    * @type Boolean
    */
   , bIs_Browser_Explorer : ( navigator.appName.match(/Explorer/) ? true : false ) // [Trekta.Utils.bIs_Browser_Explorer]

   /**
    * This ~constant provides a flag whether the browser is Firefox or not
    *
    * @id 20160624°0121
    * @type Boolean
    */
   , bIs_Browser_Firefox : ( navigator.userAgent.match(/Firefox/) ? true : false ) // [Trekta.Utils.bIs_Browser_Firefox]

   /**
    * This property provides a flag whether the browser is Opera or not.
    *  Just nice to know, Opera seems to need no more extras anymore (2019).
    *
    * @note 20190314°0411 : Opera 58 seem to need no more extra treatment.
    * @note 20190314°0413 : In Opera 58 I saw this userAgent string
    *     • "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
    *       (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36 OPR/58.0.3135.118"
    * @id 20190107°0821
    * @type Boolean
    */
   , bIs_Browser_Opera : ( navigator.userAgent.match(/(Opera)|(OPR)/) ? true : false ) // [Trekta.Utils.bIs_Browser_Opera]

   /**
    * This ~constant tells whether to pop up debug messages or not
    *
    * @id 20190311°1521
    * @type Boolean
    */
   , bShow_Debug_Dialogs : false // [Trekta.Utils.bShow_Debug_Dialogs]

};
// ~ ~ ~ ✂ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

// start mechanism [line 20190316°0231]
Trekta.Utils.windowOnloadDaisychain(Cvgr.startCanvasGear);

/* eof */
