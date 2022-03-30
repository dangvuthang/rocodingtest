/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Editor from "../components/Editor";
import { Box, Grid } from "@mui/material";
import ReactMarkdown from "react-markdown";
import Timer from "../components/Timer";

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

const markdownStyle = css`
  font-size: 0.8rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  pre {
    background: #f7f9fa;
    padding: 10px 15px;
    color: #263238;
    line-height: 1.6;
    font-size: 13px;
    border-radius: 3px;
    white-space: pre-wrap;
  }
`;

const Exam = () => {
  return (
    <Grid container>
      <Grid item container xs={3} sx={{ height: "100vh" }}>
        <Box
          sx={{
            overflowY: "scroll",
            px: "20px",
            height: "100%",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <ReactMarkdown css={markdownStyle}>{testMarkDown}</ReactMarkdown>
        </Box>
      </Grid>
      {/*       <Grid
        item
        xs={1}
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        sx={{
          height: "100vh",
          cursor: "col-resize",
          backgroundColor: "#b0bec5",
        }}
      / > */}
      <Grid item container direction="column" xs={9}>
        <Grid
          item
          sx={{ height: "5vh" }}
          container
          justifyContent="flex-end"
          alignItems="center"
        >
          <Timer />
        </Grid>
        <Grid item sx={{ backgroundColor: "#f7f9fa" }} p={1} pr={0}>
          <Editor />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Exam;
