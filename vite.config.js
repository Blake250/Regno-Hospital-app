import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})




async headers(){
return[

  {
      source :'/api/:path*',
      headers:[
        {
          key:'Access-control-Allow-Credentials', value:'true'
        },
        {
          key:'Access-control-Allow-Origin', value:'*'
        },
        {
          key:'Access-control-Allow-Methods',
           value:"GET,POST,PATCH,DELETE,OPTIONS,PUT",

        },
        {
          key:'Access-control-Allow-Headers',
           value:  "Content-Type,Authorization,X-Requested-With,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Forwarded-For,X-Real-IP,Connection,Content-Length,Content-Encoding,application/x-www-form-urlencoded"

        },
      ]
  }
]
}