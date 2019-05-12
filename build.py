#!/usr/bin/env python

# id : 20190402°0411
# encoding : UTF-8-with-BOM
# interpeter : Python 3.6
# issues/todos :
#    • Call online Closure Compiler online API (instead local executable)
#    • Local Closure Compiler path is hardcoded
#    • The drive letter changing is done quick-n-dirty
#    • After changing CWD, it were nice to restore it afterwards.
#    • Did run under Windows so far, is not tested for others,
#       e.g. exchange backslashes by slashes
# note : For implementing planned call to online Google Closure Compiler API see
#    • https://developers.google.com/closure/compiler/docs/gettingstarted_api
#    • https://developers.google.com/closure/compiler/docs/api-tutorial1
# todo : create files list programmatically from all riders\*.js files

"""
   This script minifies canvasgear.js and its rider scripts and
   then combines all to one single file canvasgear.combined.js.
   Dependency: Have Closure Compiler available on local drive.
"""

import os, sys

####sLocalCompiler = '..\\..\\..\\..\\..\\..\\gipsydrive\\app.composer\\trunk\\bin\\compiler-latest\\closure-compiler-v20190301.jar'

# enroll your local compiler here [func 20190408°0141]
def getBinPath() :
   tpBinPathes = ( '..\\..\\..\\..\\gipsydrive\\app.composer\\trunk\\bin\\compiler-latest\\closure-compiler-v20190301.jar'
                , '..\\..\\..\\..\\..\\..\\gipsydrive\\app.composer\\trunk\\bin\\compiler-latest\\closure-compiler-v20190301.jar'
                 )
   sBinPath = ''
   for sPath in tpBinPathes :
      if os.path.isfile(sPath) :
         sBinPath = sPath
         break
   return sBinPath


# seq 20190402°0441
def mount(fileslist) :

   print ('Combining files from list ..')

   # seq 20190402°0443
   # Remember ref 20190402°0437 'stackoverflow → python concatenate text files'
   with open( 'canvasgear.combined.js', 'wb' ) as newfile:
      for tupl in fileslist:
         readfile = open( tupl[1], 'rb' )
         i = newfile.tell()
         # not with the first file
         if i > 0 :
            s = '/* *** append ' + tupl[1] + ' at pos ' + str(i) + ' *** */\n\n'
            b = s.encode('utf-8')
            newfile.write(b)
         newfile.write( readfile.read() )
      # want a trailing newline
      newfile.write('\n/* eof */\n'.encode('UTF-8'))
      readfile.close()

# seq 20190402°0431
def main(argv) :

   print ('*** Run build.py ***')

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
                    , ( ''                              , 'libs\\howler\\howler.min.js' )
                     ]

   # job 1 — minify all files to intermediates
   if True :
      sBin = 'java.exe -jar ' + getBinPath() + ' --formatting PRETTY_PRINT --charset UTF-8'
      for tupls in fileslist:
         if len(tupls[0]) > 0 :
            sCmd = sBin + ' < ' + sPath + '\\' + tupls[0] + ' > ' + tupls[1]
            os.system(sCmd)
   else :
      s = 'Minfication via online Closure Compiler API not yet available'
      print (s)

   # job 2 — combine the intermediates
   mount(fileslist)

   # cleanup intermediates
   if True :                                                           # False
      for tupls in fileslist:
         if len(tupls[0]) > 0 :
            os.remove(tupls[1])

   input("Press Enter to continue...")
   print ('Bye.')

   return 123

# seq 20190402°0421 execution entry point
if __name__ == '__main__':
   i = main(sys.argv)
   sys.exit(i)
