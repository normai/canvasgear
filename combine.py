#!/usr/bin/env python
#
# id : 20190402°0411
# encoding : UTF-8-with-BOM
# interpeter : Python 3.6
# issues/todos :
#  • The drive letter changing is done quick-n-dirty
#  • After changing CWD, it were nice to restore it afterwards.
#  • Local Closure Compiler path is hardcoded
#  • If no local executable, provide fallback to online API
#  • Did run under Windows so far, is not tested for others
# note : For using the Google Closure Compiler API see
#  • https://developers.google.com/closure/compiler/docs/gettingstarted_api
#  • https://developers.google.com/closure/compiler/docs/api-tutorial1
# todo : create files list programmatically from all riders\*.js files


"""
   This script minifies then combines the canvasgear.js and its
   rider scripts to one single file canvasgear.combined.js
"""

import os, sys

sLocalCompiler = '..\\..\\..\\..\\gipsydrive\\app.composer\\trunk\\bin\\compiler-latest\\closure-compiler-v20190301.jar'

# seq 20190402°0441
def mount(files_list) :
   print ('.. mounting filelist ..')
   ##return

   # seq 20190402°0443
   # Remember ref 20190402°0437 'stackoverflow → python concatenate text files'
   with open( 'canvasgear.combined.js', 'wb' ) as newfile:
      for tupl in files_list:
         with open( tupl[1], 'rb' ) as readfile:
            i = newfile.tell()
            if i > 0 :
               s = '\n/* *** append ' + tupl[1] + ' at pos ' + str(i) + ' *** */\n\n'
               b = s.encode('utf-8')
               newfile.write(b)
            newfile.write( readfile.read() )

# seq 20190402°0431
def main(argv) :

   print ('*** Run combineall.py ***')

   # prepare path
   sFullFilename = os.path.abspath(__file__)
   tup = os.path.split(os.path.abspath(sFullFilename))
   sPath = tup[0]
   print ('Path = ' + sPath)
   os.chdir("G:\\") # not well done
   os.chdir(sPath)

   # provide files list
   fileslist = [ ( 'canvasgear.js'                      , '_min.canvasgear.js' )
                , ( 'riders\\canvasgear.Hamster.js'     , '_min.canvasgear.Hamster.js' )
                 , ( 'riders\\canvasgear.MyAlgo.js'     , '_min.canvasgear.MyAlgo.js' )
                  , ( 'riders\\canvasgear.Noisy1.js'    , '_min.canvasgear.Noisy1.js' )
                   , ( 'riders\\canvasgear.Template.js' , '_min.canvasgear.Template.js' )
                    ]

   # job 1 — minify all files to intermediates
   if True :
      sBin = 'java.exe -jar ' + sLocalCompiler + ' --formatting PRETTY_PRINT --charset UTF-8'
      for tupls in fileslist:
         sCmd = sBin + ' < ' + sPath + '\\' + tupls[0] + ' > ' + tupls[1]
         os.system(sCmd)
   else :
      s = 'Minfication via online Closure Compiler API not yet available'
      print (s)

   # job 2 — combine the intermediates
   mount(fileslist)

   # cleanup intermediates
   if False :
      for tupls in fileslist:
         os.remove(tupls[1])

   input("Press Enter to continue...")
   print ('Bye.')

   return 123

# seq 20190402°0421 execution entry point
if __name__ == '__main__':
   i = main(sys.argv)
   sys.exit(i)
