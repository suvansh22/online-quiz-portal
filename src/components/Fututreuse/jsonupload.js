const filereader= new FileReader()
const JsonDataEntry=(
    <React.Fragment>
        <Grid item xs={4} sm={4}>
            <input
            accept=".json"
            className={classes.input}
            id="part1"
            name="part1"
            type="file"
            ref={register}
            onChange={(event)=>filereader.readAsText(event.target.files[0])}
            />
                <label htmlFor="part1">
                    <Button variant="contained" component="span" startIcon={<CloudUploadIcon/>} color="primary">Part 1</Button>
                </label>           
        </Grid>
        <Grid item xs={4} sm={4}>
            <input
            accept=".json"
            className={classes.input}
            id="part2"
            name="part2"
            type="file"
            ref={register}
            />
                <label htmlFor="part2">
            <Button variant="contained" component="span" startIcon={<CloudUploadIcon/>} color="primary" disabled={parts>1?false:true}>Part 2</Button>
                </label>
        </Grid>
        <Grid item xs={4} sm={4}>
            <input
            accept=".json"
            className={classes.input}
            id="part3"
            name="part3"
            type="file"
            ref={register}
            />
                <label htmlFor="part3">
            <Button variant="contained" component="span" startIcon={<CloudUploadIcon/>} color="primary" disabled={parts>2?false:true}>Part 3</Button>
                </label>
        </Grid>
    </React.Fragment>
)

<Grid item xs={12} sm={4}>
<span>Data Entry</span>
</Grid>
<Grid item xs={12} sm={4}>
<RadioGroup style={{display:"flex",flexDirection:"row"}} aria-label="Data entry" name="Data entry" value={selectedValue} onChange={handleChange}>
    <FormControlLabel value="Manual" control={<Radio inputRef={register}/>} label="Manual" />
    <FormControlLabel value="Upload" control={<Radio inputRef={register}/>} label="Upload" />
</RadioGroup>
</Grid>


const manualDataEntry=(
    <React.Fragment>
        <Grid item xs={4} sm={4}>
                <Button variant="contained" color="primary">Part 1</Button>
            </Grid>
            <Grid item xs={4} sm={4}>
                <Button variant="contained" color="primary" disabled={parts>1?false:true}>Part 2</Button>
            </Grid>
            <Grid item xs={4} sm={4}>
                <Button variant="contained" color="primary" disabled={parts>2?false:true}>Part 3</Button>
            </Grid>
    </React.Fragment>
)