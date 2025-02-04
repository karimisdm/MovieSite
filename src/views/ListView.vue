<template>
    <div class="container">
        <div class="result">
            <div class="vector"><img src="/public/angle-left.svg"/></div>
            <div class="title_res">Result</div>
            <div class="space"></div>
        </div>
        <div class="search_bar">
            <img src="/public/searchIcon.svg" alt="icon for search" title="search" class="search_icon" />
            <input type="text" id="search" name="search" class="search_section" />
            <img src="/public/microphoneIcon.svg" alt="icon for microphone" class="microphone_icon" />
        </div>
        <div class="movies">
            <ul>
                <li>
                    first film
                </li>
                <li>
                    second film
                </li>
                <li>
                    third film
                </li>
            </ul>

        </div>

    </div>


</template>
<style>
.result {
    width: 100%;
    color: white;
    font-size: 18px;
    font-weight: 700;
    line-height: 21.78px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.title_res {
    flex-grow: 4;
}
.vector {
    width: 40px;
    height: 40px;
    border-radius: 16px;
    background-color: #222C4F;
}
.vector img {
    margin-top: 23%;
    margin-right: 10%;
}
.space {
    width: 40px;
}
</style>