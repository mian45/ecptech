<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <title></title>
    <style>
      
      
      @font-face {
       font-family: 'Montserrat';
       font-style: normal;
       font-display: swap;
       src: url(https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wdhyzbi.woff2) format('woff2');
         unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      
      /*All the styling goes here*/
      
      hr{
        height: 1px;
        background-color: #ccc;
        border: none;
    }

      .body {
        font-family: 'Montserrat';
        color: #2A2A2A;
        background-color: #f6f6f6;
        width: 100%; 
      }

      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
      .container {
        display: block;
        margin: 0 auto !important;
        /* makes it centered */
        max-width: 700px;
        padding: 10px;
        width: 700px; 
      }

      /* This should also be a block element, so that it will fill 100% of the .container */
      .content {
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
        max-width: 700px;
        padding: 10px; 
      }

      /* -------------------------------------
          HEADER, FOOTER, MAIN
      ------------------------------------- */
      .main {
        background: #ffffff;

        width: 100%; 
        box-shadow: 0px 11px 30px #00000012;
        border: 1px solid #E8E8E8;
        border-radius: 19px;
        opacity: 1;
      }

      .wrapper {
        box-sizing: border-box;
        padding: 10px 28px 10px 28px;
      }

      .content-block {
        padding-bottom: 10px;
        padding-top: 10px;
      }

      .footer {
        clear: both;
        margin-top: 10px;
        text-align: center;
        width: 100%; 
      }
      .footer table tr td p {
        color: #AAAAAA;
        font-size: 10px !important;
        text-align: center;
        margin: 40px;
        line-height: 20px !important;
       }
  
      .copy-right p{
          color: #2A2A2A !important;
          font-size: 11px !important;
         
      }

      /* -------------------------------------
          TYPOGRAPHY
      ------------------------------------- */
      
      h2{
        font-weight: bold;
        font-size: 18px;

      }
      strong{
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0px;
        opacity: 1;
      }
      table.body tr td p{
        font-size: 12px;
        font-weight: 400;
        line-height: 15px;
        letter-spacing: 0px;
        opacity: 1;
        margin:8px;
      }
      table.body tr td p span{
        font-size: 14px;
        font-weight: 400;
      }
      table.body tr{
        line-height: 15px;
      }
      ul{
        padding: 0px 0px 0px 23px;
      }
      ul li{
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0px;
        opacity: 1;
      }
      button{
        width: 90px;
        height: 33px;
        color: white;
        background: #6FA5CB 0% 0% no-repeat padding-box;
        opacity: 1;
        border: none;
        padding-left: 32px;
      }
      /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
      ------------------------------------- */
      @media only screen and (max-width: 620px) {
    
      }

     

      
    </style>
  </head>
  <body>
  
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
      <tr>
        <td>&nbsp;</td>
        <td class="container">
          <div class="content">
          <table style="width: 100%;padding:35px;">
              <tbody>
                <tr>
                  <td align="left">
                    <img src="{{asset("logo.png")}}">
                  </td>
                  <td align="right">
                       <p style="margin:0px">Invoice # 2332 <br>Dated: Dec 02, 2022</p>
                  </td>
                </tr>
              </tbody>
          </table>
            <!-- START CENTERED WHITE CONTAINER -->
            <table role="presentation" class="main">
         
              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <h2>Estimate for John Varvatos Sunglasses</h2>
                        <p style="margin-left:0px;margin-bottom:16px !important;"><strong>Name:</strong> <span> John Smith<span>&nbsp;&nbsp;<strong>Email:</strong> <span> john@mymail.com<span>&nbsp;&nbsp;<strong>Phone:</strong> <span> 123 456 7890<span></p>
                        <hr style="color:#E8E8E8">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                          <tbody>
                            <tr>
                              <td align="left" style="padding: 16px 8px 16px 8px;">
                                 <strong>Item Description</strong>
                              </td>
                              <td align="right" style="padding: 16px 8px 16px 8px;">
                                 <strong>Price</strong>
                              </td>
                            </tr>
                            <tr style="background: #F3F3F3 0% 0% no-repeat padding-box;"> 
                              <td align="left">
                                 <p>Frame Order</p>
                              </td>
                              <td align="right">
                                 <p>$0.00</p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left">
                                 <p>Frame</p>
                              </td>
                              <td align="right">
                                 <p>$0.00</p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left">
                                 <p>Drill Mounte</p>
                              </td>
                              <td align="right">
                                 <p>$0.00</p>
                              </td>
                            </tr>
                            <tr style="background: #F3F3F3 0% 0% no-repeat padding-box;">
                              <td align="left">
                                 <p>Lenses</p>
                              </td>
                              <td align="right">
                                 <p>$445.54</p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left">
                                 <p>Shamir Computer/Workspace ( Base fee )</p>
                              </td>
                              <td align="right">
                                 <p>$50.00</p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left">
                                 <p>Shamir Computer/Workspace ( Lens Material: Polycarbonate )</p>
                              </td>
                              <td align="right">
                                 <p>$0.00</p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left">
                                 <p>Material Copay</p>
                              </td>
                              <td align="right">
                                 <p>$200.00</p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left">
                                 <p>Photochromic Option: Transitions Signature 8</p>
                              </td>
                              <td align="right">
                                 <p>$75.00</p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left">
                                 <p>Antireflective Properties: Shamir Glacier Plus UV</p>
                              </td>
                              <td align="right">
                                 <p>$85.00</p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left">
                                 <p>Mirror Coating: Ski Type Mirror </p>
                              </td>
                              <td align="right">
                                 <p>$47.20</p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left">
                                 <p>Is Sunglass Lens Polarized?</p>
                              </td>
                              <td align="right">
                                 <p>Yes</p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left">
                                <ul>
                                  <li>Polycarbonate lenses are thinner, lighter weight, and impact resistant space-age lenses. Single vision.</li>
                                  <li>Viso XC no-glare technology makes your lenses easier to clean than ordinary lenses.</li>
                                  <li>They reduce glare, resist scratching, repel water, resist smudges and provide UV protection. </li>
                                  <li>The newest generation of transition lenses darken well in UV light and lighten completely indoors. Transitions options come in grey, brown, or green.</li>
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td align="left">
                                 <p>Sales Tax</p>
                              </td>
                              <td align="right">
                                 <p><i style="color:#CBCBCB">(25%)</i> $111.39</p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left">
                                 <p>Shipping</p>
                              </td>
                              <td align="right">
                                 <p>$30.00</p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left">
                                 <p>Retail fee your glasses would have cost without your vision plan</p>
                              </td>
                              <td align="right">
                                 <p>$586.93</p>
                              </td>
                            </tr>
                            <tr style="background: #F3F3F3 0% 0% no-repeat padding-box;">
                              <td align="left" >
                                 <p>Out of Pocket Fees After Your Vision Plan Contribution</p>
                              </td>
                              <td align="right">
                                 <button>$347.06</button>
                              </td>
                            </tr>
                           
                          </tbody>
                        </table>
                        
                        <table style="width: 100%;">
                        <tbody>
                        <tr>
                          <td align="right">
                              <p><strong><i>Savings of</i> : </strong><span style="color:#6FA5CB;font-size:14px;">$239.90</span></p>
                          </td>
                        </tr>
                        </tbody>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>
            <!-- END CENTERED WHITE CONTAINER -->

            <!-- START FOOTER -->
            <div class="footer">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0px 53px 5px 53px">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<p>
                    <hr>
                  </td>
                </tr>
               
                <tr>
                  <td class="copy-right">
                   <p> Copyright © Urban Optics 2022. All Rights Reserved.</p>
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->

          </div>
        </td>
        <td>&nbsp;</td>
      </tr>
    </table>
  </body>
</html>