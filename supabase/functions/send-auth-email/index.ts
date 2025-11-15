import { Resend } from 'https://esm.sh/resend@2.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailPayload {
  user: { email: string }
  email_data: {
    token: string
    token_hash: string
    redirect_to: string
    email_action_type: string
  }
}

function getResetPasswordTemplate(token: string, resetLink: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Redefinição de Senha - RedData</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; background-color: #f6f9fc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f9fc; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td align="center" style="padding: 40px 20px 20px;">
                    <img src="https://vjxssuywneheecuirxwb.supabase.co/storage/v1/object/public/og-images/reddata-logo-optimized.png" alt="RedData" width="180" style="display: block;">
                  </td>
                </tr>
                
                <tr>
                  <td align="center" style="padding: 20px 20px;">
                    <h1 style="margin: 0; color: #1a1a1a; font-size: 28px; font-weight: bold;">Redefinição de Senha</h1>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 0 40px;">
                    <p style="margin: 16px 0; color: #484848; font-size: 16px; line-height: 26px;">
                      Você solicitou a redefinição de senha da sua conta RedData.
                    </p>
                    
                    <p style="margin: 16px 0; color: #484848; font-size: 16px; line-height: 26px;">
                      Clique no botão abaixo para criar uma nova senha:
                    </p>
                  </td>
                </tr>
                
                <tr>
                  <td align="center" style="padding: 27px 0;">
                    <a href="${resetLink}" style="background-color: #dc2626; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; display: inline-block;">
                      Redefinir Senha
                    </a>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 0 40px;">
                    <p style="margin: 16px 0; color: #484848; font-size: 16px; line-height: 26px;">
                      Ou copie e cole este código de verificação:
                    </p>
                    
                    <div style="background-color: #f4f4f4; border: 1px solid #e1e1e1; border-radius: 8px; padding: 16px; margin: 16px 0; text-align: center;">
                      <code style="color: #1a1a1a; font-size: 18px; font-weight: 600; letter-spacing: 2px;">${token}</code>
                    </div>
                    
                    <p style="margin: 24px 0 0; color: #8898aa; font-size: 14px; line-height: 24px;">
                      Se você não solicitou esta redefinição, pode ignorar este email com segurança.
                    </p>
                  </td>
                </tr>
                
                <tr>
                  <td align="center" style="padding: 32px 20px 48px;">
                    <p style="margin: 0; color: #8898aa; font-size: 12px; line-height: 16px;">
                      <a href="https://redmaxx.com.br" style="color: #8898aa; text-decoration: underline;">RedMaxx</a> · 
                      <a href="https://redmaxx.com.br" style="color: #8898aa; text-decoration: underline;">RedData</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

function getMagicLinkTemplate(token: string, loginLink: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Seu link de acesso - RedData</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; background-color: #f6f9fc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f9fc; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td align="center" style="padding: 40px 20px 20px;">
                    <img src="https://vjxssuywneheecuirxwb.supabase.co/storage/v1/object/public/og-images/reddata-logo-optimized.png" alt="RedData" width="180" style="display: block;">
                  </td>
                </tr>
                
                <tr>
                  <td align="center" style="padding: 20px 20px;">
                    <h1 style="margin: 0; color: #1a1a1a; font-size: 28px; font-weight: bold;">Login na Plataforma</h1>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 0 40px;">
                    <p style="margin: 16px 0; color: #484848; font-size: 16px; line-height: 26px;">
                      Clique no botão abaixo para acessar sua conta RedData:
                    </p>
                  </td>
                </tr>
                
                <tr>
                  <td align="center" style="padding: 27px 0;">
                    <a href="${loginLink}" style="background-color: #dc2626; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; display: inline-block;">
                      Acessar RedData
                    </a>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 0 40px;">
                    <p style="margin: 16px 0; color: #484848; font-size: 16px; line-height: 26px;">
                      Ou copie e cole este código de acesso temporário:
                    </p>
                    
                    <div style="background-color: #f4f4f4; border: 1px solid #e1e1e1; border-radius: 8px; padding: 16px; margin: 16px 0; text-align: center;">
                      <code style="color: #1a1a1a; font-size: 18px; font-weight: 600; letter-spacing: 2px;">${token}</code>
                    </div>
                    
                    <p style="margin: 24px 0 0; color: #8898aa; font-size: 14px; line-height: 24px;">
                      Se você não tentou fazer login, pode ignorar este email com segurança.
                    </p>
                  </td>
                </tr>
                
                <tr>
                  <td align="center" style="padding: 32px 20px 48px;">
                    <p style="margin: 0; color: #8898aa; font-size: 12px; line-height: 16px;">
                      <a href="https://redmaxx.com.br" style="color: #8898aa; text-decoration: underline;">RedMaxx</a> · 
                      <a href="https://redmaxx.com.br" style="color: #8898aa; text-decoration: underline;">RedData</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

function getConfirmSignupTemplate(token: string, confirmLink: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirme seu cadastro - RedData</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; background-color: #f6f9fc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f9fc; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td align="center" style="padding: 40px 20px 20px;">
                    <img src="https://vjxssuywneheecuirxwb.supabase.co/storage/v1/object/public/og-images/reddata-logo-optimized.png" alt="RedData" width="180" style="display: block;">
                  </td>
                </tr>
                
                <tr>
                  <td align="center" style="padding: 20px 20px;">
                    <h1 style="margin: 0; color: #1a1a1a; font-size: 28px; font-weight: bold;">Bem-vindo ao RedData!</h1>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 0 40px;">
                    <p style="margin: 16px 0; color: #484848; font-size: 16px; line-height: 26px;">
                      Obrigado por se cadastrar na plataforma RedData da RedMaxx.
                    </p>
                    
                    <p style="margin: 16px 0; color: #484848; font-size: 16px; line-height: 26px;">
                      Para confirmar seu cadastro e começar a usar a plataforma, clique no botão abaixo:
                    </p>
                  </td>
                </tr>
                
                <tr>
                  <td align="center" style="padding: 27px 0;">
                    <a href="${confirmLink}" style="background-color: #dc2626; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; display: inline-block;">
                      Confirmar Cadastro
                    </a>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 0 40px;">
                    <p style="margin: 16px 0; color: #484848; font-size: 16px; line-height: 26px;">
                      Ou copie e cole este código de verificação:
                    </p>
                    
                    <div style="background-color: #f4f4f4; border: 1px solid #e1e1e1; border-radius: 8px; padding: 16px; margin: 16px 0; text-align: center;">
                      <code style="color: #1a1a1a; font-size: 18px; font-weight: 600; letter-spacing: 2px;">${token}</code>
                    </div>
                    
                    <p style="margin: 24px 0 0; color: #8898aa; font-size: 14px; line-height: 24px;">
                      Se você não criou uma conta, pode ignorar este email com segurança.
                    </p>
                  </td>
                </tr>
                
                <tr>
                  <td align="center" style="padding: 32px 20px 48px;">
                    <p style="margin: 0; color: #8898aa; font-size: 12px; line-height: 16px;">
                      <a href="https://redmaxx.com.br" style="color: #8898aa; text-decoration: underline;">RedMaxx</a> · 
                      <a href="https://redmaxx.com.br" style="color: #8898aa; text-decoration: underline;">RedData</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const payload: EmailPayload = await req.json()
    
    const {
      user,
      email_data: { token, token_hash, redirect_to, email_action_type },
    } = payload

    console.log('Processing email for action:', email_action_type, 'to:', user.email)

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const verifyLink = `${supabaseUrl}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`

    let html: string
    let subject: string

    switch (email_action_type) {
      case 'magic_link':
        html = getMagicLinkTemplate(token, verifyLink)
        subject = 'Seu link de acesso - RedData'
        break

      case 'recovery':
        html = getResetPasswordTemplate(token, verifyLink)
        subject = 'Redefinição de senha - RedData'
        break

      case 'signup':
      case 'invite':
        html = getConfirmSignupTemplate(token, verifyLink)
        subject = 'Confirme seu cadastro - RedData'
        break

      default:
        console.error('Unknown email action type:', email_action_type)
        return new Response(
          JSON.stringify({ error: 'Unknown email action type' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

    const { error } = await resend.emails.send({
      from: 'RedData <reddata@redmaxx.com.br>',
      to: [user.email],
      subject,
      html,
    })

    if (error) {
      console.error('Error sending email:', error)
      throw error
    }

    console.log('Email sent successfully to:', user.email)

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in send-auth-email function:', error)
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
