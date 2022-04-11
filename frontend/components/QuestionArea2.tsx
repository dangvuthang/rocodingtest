import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { AnnotationIcon } from "@heroicons/react/outline";
interface QuestionArea2Props {}

const testMarkDown = `
# Spem modo

## Cum nocendi

Lorem markdownum celebrare miserere stant! Unda sua hanc dixerit iugeribus
[traiecit bracchia virgo](http://www.somnumnile.net/lacus.aspx) iam aratri, Ecce
longo si sunt tum et gentis. Sanguine cum videt mihi **solibus veniam**,
alimentaque nomen dea!

- Luctus aevum sensit quam moraque
- Per facta arsuro urbi
- Sua parabam se flammis meus parabantur
- Erat nymphisque fretum
- Cum nisi tamen foedumque tamen consistere aures

Ilia vanis io accepisse, coronant, est petere inania! Tulit domo arbore noxque
renarro tantum quae primum leto votaque causa! Dignissime super.

## Si funesti

Sui iecur quo **furtum** poscat consistere vultum bibuntur operique Achilles
cecidit. Tales qua colorem foret illis vana duabuset terga Achilli vidit,
palmas. [De](http://gravispalicorum.org/etpostquam) voce se laudis erudit
Achillem in visu moenia vosque oculis temporis ulterius. Facta mea procellae
superos. Nec sed est que currebam caeruleum ausae Trachinia: rexque: en officium
desierat: quo urbes terrarumque.

[Patent longissima de](http://cycnum-tibi.org/diem) que serpens feriam: utraque
ora quod volentem Iovis Trinacris possidet mactatur ambitione! Habentem
promisistis se figitur, est carina saepe ait *omnique amnis* es, [in
sit](http://timorformam.io/) dixerat tamen constitit. Adspiciens quo.

    if (cc) {
        leopardInterlaced += twitter;
        serviceNas = ocrOop;
    } else {
        keylogger(329587, 1, linkListserv);
        microphoneFrameworkMiddleware -= skinCaptchaNas(null + 4, -5 * nic,
                vista);
        sound *= 4;
    }
    if (vector_thermistor_signature - control + swipe) {
        sprite_export_token /= hyper_fragmentation_switch +
                copyright_recursive_unfriend / parallel_ctp;
        romSystemMask(4, ray_shortcut_rom(94, -2, kde_ad));
        web_hashtag.mapWanOffice(-4, pipelineProgramTrash);
    }
    backlink_artificial_x(toslink);
    if (3) {
        device(mountSystem(-5, nodeRaw, 5));
    } else {
        internic = logicKbpsC(kibibyte_basic, grayscale(num_dma_subdirectory),
                navigation - 2);
    }

Humanos coniuge tutior; populos supremis sibilat numeratur, servare modo ut
onerosa vaccam. Decebat irasci aras de secus memor magna sic dulcedine Cecropis
totiens, et iuvat. Silva agitante, in aurea est secutum admiserat, faciat
veniam. Annorum saecula Tirynthia cruentis crudele semine ensis; loco videtur
nostrumque petisset laurus?
`;

const QuestionArea2: FC<QuestionArea2Props> = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#f7f9fa] flex">
        <div className="text-sm flex justify-center items-center px-11 py-3 bg-white gap-x-2 border border-transparent text-[#37474f]">
          <AnnotationIcon className="h-4 w-4" />
          <div>Description</div>
        </div>
      </div>
      <div className="h-full overflow-auto flex flex-col">
        <ReactMarkdown className="prose prose-sm flex flex-col px-5">
          {testMarkDown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default QuestionArea2;
